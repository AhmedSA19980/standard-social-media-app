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


branch name : test1

# build Standard social medial app

# feature:

U shortCut for Update
D shortcut for Delete

1. - [x]  User Account(U , D) 
2. - [] Post (U,D)
3. - [] add comment to Post []
4. - [] A user has a profile []


## Stacks

| First Header  | Second Header |
| ------------- | ------------- |
| Back-end  | [nodejs,express, Redis , Postgress , tyepgraphql]  |
| front-end  | nextjs |

## bottlenecks(back-end)
| apollo server V2                   |     apollo server V3          |
| ---------------------------------- |------------------------------ |
| (file upoload) is valnerable to | (file upload ) is not supported
  CSRF attack                     
| Subscription-trasnport-ws          | issues with integration(graphql-ws)
 library is not maintaining          | Subscription-trasnport-ws(works)
 anymore {but works}
  
# future Solution
1- build file upload api
2- add another file upload api "add more cost"


## bottlenecks(front-end)
1- after mutation user data appear successfuly , then on reload the page (data) is lost 
2-serverside-render 
