# **Regret Prevention System**  

A **VS Code / Cursor IDE** extension that saves your code **before you break it**. Think of it as a **"panic button"** you don’t have to press.  

## **Features**  

- **Automatic backups** when you open a folder (because manual saving is for amateurs).  
- **Configurable backup location**, because we know you'll forget where you put it.  
- **Enable/disable backup** functionality—toggle it off if you like living dangerously.  
- **Excludes `node_modules` and `.git`**, because nobody needs a 5GB backup of stuff they don’t understand.  
- **Timestamp-based backups**, so you can pinpoint *exactly when you messed up.*  

## **Configuration**  

This extension lets you tweak the following settings (because we believe in *free will*):  

* `regretPreventionSystem.backupPath` – Where to store your backups, so they don’t clutter your desktop like your other “important files.”  
* `regretPreventionSystem.enabled` – Turn automatic backups **on** or **off** (but let’s be honest, you should leave it on).  

## **How to Use**  

1. Install the extension.  
2. Open **VS Code / Cursor IDE** settings.  
3. Search for **"Regret Prevention System"** (or just accept the default settings like everyone else).  
4. Set your **backup path** (or don’t, we’ll handle it).  
5. Open a folder, and we’ll **silently** save your code while you pretend you don’t make mistakes.  

## **Notes**  

- Backups follow this **foolproof** format: `folderName_timestamp`.  
- Each backup lives in its own little folder—so no **"Oops, I overwrote my last backup"** moments.  
- If your project is huge, the backup might take a few seconds. But hey, *waiting is better than rewriting everything.*  

You're welcome. 🚀

