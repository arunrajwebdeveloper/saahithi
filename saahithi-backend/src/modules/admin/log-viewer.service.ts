import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LogViewerService {
  private readonly logDirectory = path.join(process.cwd(), 'logs');

  /**
   * Reads the latest log file and returns the entries.
   */
  async getLatestLogs() {
    // Find all files in the logs directory
    if (!fs.existsSync(this.logDirectory)) {
      throw new NotFoundException('Log directory not found');
    }

    const files = fs.readdirSync(this.logDirectory);
    if (files.length === 0) return [];

    // Sort to get the most recent file
    const latestFile = files.sort().reverse()[0];
    const filePath = path.join(this.logDirectory, latestFile);

    // Read and parse the JSON logs
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Convert the string of JSON objects into a valid array
    return fileContent
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => JSON.parse(line));
  }
}
