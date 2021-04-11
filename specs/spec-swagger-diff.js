/**
 * This script downloads a source OpenApi specification file from an URL
 * and checks against a local OpenApi specification file (using swagger-diff)
 * if any breaking changes are found. If breaking changes are found the process
 * exits with -1 failing the script.
 *
 * Notes:
 * - This script only supports OpenAPI 2.0 (aka Swagger 2.0)
 *
 * - To add support to OpenAPI 3.0, please replace swagger-diff with openapi-diff
 *
 * - For more details on how to configure swagger-diff please refer to this link:
 *   https://github.com/zallek/swagger-diff
 */

const swaggerDiff = require('swagger-diff');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');
const http = require('https');
const yaml = require('js-yaml');

const argv = yargs(hideBin(process.argv)).argv;

const config = {
  apiSpecFileName: `${argv._[0]}.yaml`,
  tempOpenApiSpecDir: "./bin/",
  localOpenApiSpecPath: "./specs/order-view-swagger.yaml",
  sourceOpenApiSpecFullFilePath: `./bin/${argv._[0]}.yaml`,
  sourceOpenApiUrl: "<place spec url here>",
};

const swaggerDiffConfig = {
  changes: {
    breaks: {
      major: 2,
      minor: 3,
      patch: 3,
      unchanged: 3,
    },
    smooths: {
      major: 0,
      minor: 1,
      patch: 2,
      unchanged: 3,
    },
  },
  rules: {
    "delete-path": 0,
    "add-path": {
      major: 2,
      minor: 3,
      patch: 3,
      unchanged: 3,
    },
    "add-optional-object-property": 2,
  },
};

/**
 * Creates a temp dir where the OpenAPI spec file will be downloaded
 */
function createTempOpenApiSpecDir() {
  if (!fs.existsSync(config.tempOpenApiSpecDir)) {
    fs.mkdirSync(config.tempOpenApiSpecDir);
  }
}

/**
 * Deletes the created temp directory and the source OpenAPI spec file
 */
function deleteTempOpenApiSpecDir() {
  if (fs.existsSync(config.tempOpenApiSpecDir)) {
    fs.rmdirSync(config.tempOpenApiSpecDir, { recursive: true });
  }
}

/**
 * Downloads the source OpenAPI spec file from a URL
 * @param {Source OpenAPI spec file URL to download} specUrl
 * @param {Path to where the file will be downloaded} path
 * @param {Callback function that is called after download finishes} callback
 */
function downloadMasterSpec(specUrl, path, callback) {
  const download = function (url, destPath, cb) {
    const file = fs.createWriteStream(destPath);

    http.get(url, (response) => {
      response.pipe(file);
    });

    file.on("finish", () => {
      file.close(cb);
    });
  };

  download(specUrl, path, callback);
}

/**
 *
 * @param {The source OpenAPI spec file} sourceFileName
 * @param {The target OpenAPI spec file} destinationFileName
 * @param {swagger-diff config settings} swaggerConfig
 */
function apispecDiff(sourceFileName, targetFileName, swaggerConfig) {
  const oldSpec = yaml.load(fs.readFileSync(sourceFileName, "utf8"));
  const newSpec = yaml.load(fs.readFileSync(targetFileName, "utf8"));

  swaggerDiff(oldSpec, newSpec, swaggerConfig)
    .then((result) => {
      if (result.errors.length > 0) {
        console.log(result.errors);
        process.exit(-1);
      }
    })
    .then(() => {
      deleteTempOpenApiSpecDir();
    })
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
      process.exit(-1);
    });
}

/**
 * Callback function for when the source OpenAPI spec file finishes downloading
 */
function downloadFinished() {
  apispecDiff(
    config.sourceOpenApiSpecFullFilePath,
    config.localOpenApiSpecPath,
    swaggerDiffConfig,
  );
}

/**
 * First the script creates a temp dir for the source OpenAPI spec file and then it
 * downloads the file. The downloadFinished callback will trigger the spec diff process.
 */
function execute() {
  createTempOpenApiSpecDir();
  downloadMasterSpec(
    config.sourceOpenApiUrl,
    config.sourceOpenApiSpecFullFilePath,
    downloadFinished,
  );
}

execute();
