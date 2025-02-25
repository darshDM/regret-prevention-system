# Regret Prevention System

A VS Code extension that automatically creates backups of your workspace folders when they are opened.

## Features

- Automatic backup creation when opening folders
- Configurable backup location
- Enable/disable backup functionality
- Excludes node_modules and .git directories from backup
- Timestamp-based backup folders

## Configuration

This extension contributes the following settings:

* `regretPreventionSystem.backupPath`: Set the path where backups will be stored
* `regretPreventionSystem.enabled`: Enable or disable automatic backups

## How to Use

1. Install the extension
2. Open VS Code Settings
3. Search for "Regret Prevention System"
4. Set your desired backup path
5. The extension will automatically create backups when you open folders

## Notes

- Backups are created in the format: `folderName_timestamp`
- Each backup is stored in a separate folder
- Large projects may take some time to backup 