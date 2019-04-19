#!/usr/bin/env node
/**
 * if hasn't projectName ,set one
 */
export declare function setProjectName(dir?: string): {};
export declare function setFileName(dir?: string): {};
/**
 * select mode
 */
export declare function mode(): {};
/**
 * file directory
 * @param mode
 */
export declare function type(mode: string): any;
/**
 * node version need > 8
 * @param version
 */
export declare function compareVersion(version: string): boolean;
/**
 * render view
 * @param filename
 * @param viewsPath
 */
export declare function renderView(filename: string, viewsPath: string): void;
