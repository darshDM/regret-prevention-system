const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
    console.log('Regret Prevention System is now active!');

    // Register commands
    let enableCommand = vscode.commands.registerCommand('regret-prevention-system.enable', () => {
        const config = vscode.workspace.getConfiguration('regretPreventionSystem');
        config.update('enabled', true, true);
        vscode.window.showInformationMessage('Regret Prevention System enabled');
    });

    let disableCommand = vscode.commands.registerCommand('regret-prevention-system.disable', () => {
        const config = vscode.workspace.getConfiguration('regretPreventionSystem');
        config.update('enabled', false, true);
        vscode.window.showInformationMessage('Regret Prevention System disabled');
    });

    // Register a workspace folder change event listener
    let folderChangeDisposable = vscode.workspace.onDidChangeWorkspaceFolders(event => {
        handleWorkspaceFolderChange(event);
    });

    // Also check for any folders that are already open
    if (vscode.workspace.workspaceFolders) {
        vscode.workspace.workspaceFolders.forEach(folder => {
            createBackup(folder.uri.fsPath);
        });
    }

    context.subscriptions.push(enableCommand);
    context.subscriptions.push(disableCommand);
    context.subscriptions.push(folderChangeDisposable);

    // Show initial setup message
    const config = vscode.workspace.getConfiguration('regretPreventionSystem');
    if (!config.get('backupPath')) {
        vscode.window.showInformationMessage(
            'Regret Prevention System: Please configure backup path in settings',
            'Open Settings'
        ).then(selection => {
            if (selection === 'Open Settings') {
                vscode.commands.executeCommand('workbench.action.openSettings', 'regretPreventionSystem');
            }
        });
    }
}

function handleWorkspaceFolderChange(event) {
    // Handle added folders
    event.added.forEach(folder => {
        createBackup(folder.uri.fsPath);
    });
}

function createBackup(sourcePath) {
    const config = vscode.workspace.getConfiguration('regretPreventionSystem');
    const isEnabled = config.get('enabled');
    const backupPath = config.get('backupPath');

    if (!isEnabled) {
        console.log('Regret Prevention System is disabled');
        return;
    }

    if (!backupPath) {
        vscode.window.showErrorMessage('Please configure backup path in settings');
        return;
    }

    try {
        // Create timestamp for unique backup folder
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const folderName = path.basename(sourcePath);
        const backupFolderPath = path.join(backupPath, `${folderName}_${timestamp}`);

        // Create backup directory if it doesn't exist
        if (!fs.existsSync(backupPath)) {
            fs.mkdirSync(backupPath, { recursive: true });
        }

        // Copy the entire folder
        copyFolderRecursive(sourcePath, backupFolderPath);

        vscode.window.showInformationMessage(`Backup created successfully at: ${backupFolderPath}`);
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to create backup: ${error.message}`);
    }
}

function copyFolderRecursive(source, target) {
    // Create target directory
    fs.mkdirSync(target, { recursive: true });

    // Read source directory
    const files = fs.readdirSync(source);

    files.forEach(file => {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);

        const stat = fs.statSync(sourcePath);

        if (stat.isDirectory()) {
            // Skip node_modules and .git directories
            if (file !== 'node_modules' && file !== '.git') {
                copyFolderRecursive(sourcePath, targetPath);
            }
        } else {
            fs.copyFileSync(sourcePath, targetPath);
        }
    });
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}; 