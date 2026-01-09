# Script to initialize git repo and push to GitHub
# Run this in PowerShell from the project directory

cd "c:\Users\NickG\Documents\Orca Site"

# Initialize git repository (if not already initialized)
if (-not (Test-Path .git)) {
    git init
}

# Add the remote (will set it if it doesn't exist, or update if it does)
git remote remove origin 2>$null
git remote add origin https://github.com/NickyGee44/orca-test-site.git

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Orca marketing website with CMS, animated background, and all features"

# Push to GitHub (main branch)
git branch -M main
git push -u origin main

Write-Host "`nDone! Your code has been pushed to GitHub."
Write-Host "Repository: https://github.com/NickyGee44/orca-test-site.git"
