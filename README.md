echo "# standard-social-media-app" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:AhmedSA19980/standard-social-media-app.git
git push -u origin main
…or push an existing repository from the command line
git remote add origin git@github.com:AhmedSA19980/standard-social-media-app.git
git branch -M main
git push -u origin main
…or import code from another repository
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.


branch name : main

if you face a problem like can't find module @plugin/typescript-cjs  , remove [plugin] from(yarnc.yml ) and then  runn yarn plugin import typescript
