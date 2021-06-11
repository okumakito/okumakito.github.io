# flaskとmod_wsgiの連携方法 (2021/06/11)


## はじめに

flaskの公式ページの説明で分かりづらかった点を補足します。
https://flask.palletsprojects.com/en/2.0.x/deploying/mod_wsgi/

### 環境

* ubuntu 20.04
* apache 2.4.41
* bash 5.0.17
* サーバIPアドレス (説明用) 192.168.0.100

### 参考にしたサイト

* https://flask.palletsprojects.com/en/2.0.x/
* https://flask.palletsprojects.com/en/2.0.x/deploying/mod_wsgi/
* https://qiita.com/Hiroyuki1993/items/27c4e78533778753b5d0
* https://qiita.com/kei4eva4/items/196622276677c4a72a37

## flaskを準備する

### ディレクトリを作る

user_nameとgroup_nameは実際に作業するユーザ名とグループ名に変えて下さい。
```
$ sudo -i
$ cd /var/www
$ mkdir flask_test
$ chown user_name:group_name flask_test
$ exit
```

### pythonの仮想環境を作る

flask公式ページではvenvを使っていますが、**venvだとmod_wsgiと連携出来ない**ので、virtualenvを使います。
```
$ sudo apt install virtualenv virtualenvwrapper
$ cd /var/www/flask_test
$ virtualenv venv
```

### 仮想環境の中でflaskをインストールする

```
$ source venv/bin/activate
$ pip install Flask
```

### メインのpythonコードを書く

ファイル名は何でも構いませんが、ここではmain.pyとします。
```
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
  return 'hello'

```

### 一旦確認

```
$ export FLASK_APP=main
$ flask run -h 0.0.0.0
```
ブラウザで確認する。
http://192.168.0.100:5000/


### 仮想環境から出たい場合

exitまたは以下で出られます。
```
$ deactivate
```

## mod_wsgiと連携する

### mod_wsgiをインストールする

ここからしばらくroot権限で作業します。
```
$ sudo -i
$ apt install libapache2-mod-wsgi-py3
```

### mod_wsgiの設定ファイルを書く
/etc/apache2/sites-available/の下にwsgi.confというファイルを作り、以下の内容を書きます。**WSGIScriptAliasのすぐ右を / から変えておく**ことで、ポート80のまま、他のウェブページに影響することなくflaskのアプリを稼働させられるようです。
```
<VirtualHost *:80>
serverName 192.168.0.100:80

WSGIDaemonProcess flask_test user=www-data group=www-data threads=5
WSGIScriptAlias /flask_test /var/www/flask_test/wsgi.py

<Directory /var/www/flask_test>

WSGIProcessGroup flask_test
WSGIApplicationGroup %{GLOBAL}
WSGIScriptReloading On

Require all granted

</Directory>
</VirtualHost>

```

### mod_wsgiを有効にする

/etc/apache2/sites-enabled/ にシンボリックリンクが作られます。ただし、リロードするまで反映はされません。一旦rootから抜けます。
```
$ a2enconf wsgi
$ exit
```

### 連携用のスクリプトを書く

/var/www/flask_test の下に wsgi.py というファイルを作り、以下の内容を書きます。公式ページでは拡張子を.wsgiとしていましたが、pythonスクリプトなのでここでは.pyにしました。メインファイル名をmain.pyから変えた場合は、最後の行のfromのすぐ後を適宜変えて下さい。なお、venvコマンドで仮想環境を作った場合はactivate_this.pyファイルが生成されず、エラーになります。
```
import sys, os
dir_name = os.path.dirname(__file__)
sys.path.insert(0, dir_name)
activate_this = os.path.join(dir_name, 'venv/bin/activate_this.py')
with open(activate_this) as file_:
  exec(file_.read(), dict(__file__=activate_this))
from main import app as application
```

### apacheを再読込みする

```
$ sudo systemctl reload apache2
```

### ブラウザで確認する

http://192.168.0.100/flask_test/

### 最終的なファイル構成
<pre>
/var/www/flask_test/
 - main.py
 - wsgi.py
 - venv/...
/etc/apache2/sites-available/wsgi.conf
</pre>
