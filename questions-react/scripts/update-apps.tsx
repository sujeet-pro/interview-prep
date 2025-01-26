import * as fs from 'node:fs';
import * as path from 'node:path';

export function updateApps() {
  const appsDir = path.join(__dirname, '../apps');
  const templateDir = path.join(__dirname, '../_template');

  if (!fs.existsSync(appsDir)) {
    console.error(`Apps directory ${appsDir} does not exist.`);
    return;
  }

  fs.readdir(appsDir, (err, apps) => {
    if (err) {
      console.error(`Error reading apps directory: ${err}`);
      return;
    }

    apps.forEach(app => {
      const appDir = path.join(appsDir, app);

      fs.readdir(templateDir, (err, files) => {
        if (err) {
          console.error(`Error reading template directory: ${err}`);
          return;
        }

        files.forEach(file => {
          const srcFile = path.join(templateDir, file);
          const destFile = path.join(appDir, file);

          fs.copyFile(srcFile, destFile, (err) => {
            if (err) {
              console.error(`Error copying file ${file} to app ${app}: ${err}`);
            }
          });
        });
      });
    });
  });

  console.log(`All apps updated successfully.`);
}

// Example usage
updateApps();
