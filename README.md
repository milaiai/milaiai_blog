# Requirement
- Get NVM
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
- Install node.js
```sh
nvm install v22.16.0
```
- [Hugo Extend](https://github.com/gohugoio/hugo/releases/tag/v0.147.9)
Must install extended version
- npm

```sh
npm install -g postcss-cli
npm install -g autoprefixer
npm install fuse.js
```

- themei: https://themes.gohugo.io/blonde/
```sh
$ git submodule add https://github.com/opera7133/Blonde.git themes/Blonde
$ cd themes/Blonde
$ npm install
```
Update the theme

```sh
git submodule update --remote --merge
```

# Usage
## Run

```sh
npm run start

hugo server --renderToDisk
hugo server --renderToDisk --disableFastRender -t Blonde

hugo --gc -v -t Blonde

hugo server --bind=0.0.0.0 --baseURL=http://www.milaiai.com --port=1313
```

- docer proxy
```sh
sudo vim /etc/systemd/system/docker.service.d/http-proxy.conf 

[Service] 
Environment="HTTP_PROXY=http://X.X.X.X:80" 
Environment="HTTPS_PROXY=http://X.X.X.X:443"

sudo systemctl daemon-reload 
sudo systemctl restart docker 
sudo systemctl show --property=Environment docker
```

# Errors

- hugo.IsServer

```sh
can't evaluate field IsServer in type interface {}
```

IsServer was only added to Hugo in version 0.120.0, so if you’re using an older version, you’ll see this error..

See https://techoverflow.net/2024/09/16/how-to-fix-hugo-can-t-evaluate-field-isserver-in-type-interface/
- TOCSS error
```sh
Error: error building site: TOCSS: failed to transform "/ananke/css/main.css" (text/css). Check your Hugo installation; you need the extended version to build SCSS/SASS with transpiler set to 'libsass'.: this feature is not available in your current Hugo version, see https://goo.gl/YMrWcn for more information
```
A: install hugo_extend

# References 
- [Upgrading Node.js to the latest version](https://stackoverflow.com/questions/10075990/upgrading-node-js-to-the-latest-version)
- [nvm install](https://bmhiamso1.medium.com/ubuntu-%E5%AE%89%E8%A3%9D-nvm-npm-3bf6bffa9152)
