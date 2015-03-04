Team Workflow

On master branch

1. git pull
2. Make a new branch and switch to that branch by running git checkout -b my_feature
3. On my_feature branch

Do your changes here
1. git add -A and git commit -m "my changes"
2. git checkout master
3. On master branch

1. git pull
2. git checkout my_feature
3. On my_feature branch

1. git merge master
2. RESOLVE ALL CONFLICTS <<< IMPORTANT!
3. git add -A and `git commit -m "merged master into my_feature"
4. git push origin my_feature
5. On Github

1. Create a pull request
2. Notify someone that you have created a pull request
3. Don't branch or work on another feature until the request has been merged into master.
4. On your local computer

git checkout master
On master

git pull
Repeat the steps
