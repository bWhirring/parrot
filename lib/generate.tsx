#!/usr/bin/env node

import * as ncp from "ncp";
import * as path from "path";
import * as ora from "ora";
import { exec, execSync } from "child_process";
import * as merge from "lodash.merge";
import * as fs from "fs";
const inquirer = require("inquirer");

import { renderView, setFileName } from "./util";

let data = {
  name: "",
  version: "0.0.1",
  author: "HUHU",
  license: "MIT",
  repository: {
    type: "nodejs",
    url: "git@192.168.1.66:FE/parrot.git"
  }
};

/**
 * generation directory
 * @param dir directory
 * @param projectName project name
 */
export function dir(dir: string, projectName: string) {
  const spinner = ora("init project");
  spinner.start();
  const packageJson = require(`${dir}/package.json`);
  packageJson.name = projectName;
  data.name = projectName;
  data = merge(data, packageJson);
  ncp.ncp(dir, projectName, err => {
    if (err) {
      console.log(err);
      process.exit();
    }
    spinner.stop();
    console.log();
    console.log("Project init finished".green);
    console.log("=====================".green);
    fs.writeFileSync(
      path.resolve(process.cwd(), `${projectName}/package.json`),
      new Buffer(JSON.stringify(data, null, 2))
    );

    console.log();
    console.log("To get started");
    console.log();
    console.log(`    cd ${projectName}`.red);
    console.log("    yarn && npm run start".red);
  });
}

export async function viewTemplate(name: string) {
  const viewsPath = process.cwd() + "/src/views";
  let filename = name && name.split(".")[0];
  if (!fs.existsSync(viewsPath)) {
    const { views } = await inquirer.prompt({
      name: "views",
      type: "confirm",
      message: "Target directory hasn't exist, mkdir one"
    });
    if (views) {
      fs.mkdirSync(viewsPath);
      filename && renderView(filename, viewsPath);
    } else {
      process.exit();
    }
  } else {
    !name && (await setFileName());
    filename = global["filename"] || name;
    const exist = fs.existsSync(`${viewsPath}/${filename}.js`);
    if (exist) {
      console.log("the file has exist, please input another one".red);
      return false;
    }
    renderView(filename, viewsPath);
  }
}
