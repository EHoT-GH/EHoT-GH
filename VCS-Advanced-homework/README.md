> mkdir VCS-Advanced-homework
> cd VCS-Advanced-homework
> git branch architecture
> git checkout architecture
> echo >> index.html
> git status
> git add .
> git commit -m "Added assets, uploads folders. Greated index.html"
> git status
> cd assets/
> echo >> all.js
> echo >> css.js
> cd ..
> git status
> git add .
> git commit -m "Added all.js, css.js at assets folder"
> git push origin architecture
> git status
> cd VCS-Advanced-homework
> echo uploads/*.* >> .gitignore
> git merge --no-commit architecture
> git checkout master
> git branche -D architecture 