# Google Cloud Text-to-Speechの合成音声のデータを取得する方法 (2020/06/08)

## はじめに

* 遠隔授業用に講義動画を作りたいけど自分の声は嫌だ、という私のような方向けの情報です。

* 合成音声というと「ゆっくり」が有名ですが、やや不自然なため嫌という学生もいるそうです。

* Google Cloud Text-to-Speechが凄く良いのでオススメです。
  https://cloud.google.com/text-to-speech/

* お試し版の使い方
  * 日本語の文章を適当に入力
  * Languageを日本語に設定 (下から3番目)
  * Voice nameを **A以外のどれか** に変更 (Bは女性の声、CとDは男性の声)
  * SPEAK ITを押して「私はロボットではありません」にチェック

* きちんと登録して使う場合 (以下の方法2に該当) でも毎月100万文字までは無料らしいので、授業動画程度であれば問題ないでしょう。

* 以下ではこの合成音声のデータをMP3などの形式で取得する方法を2つ紹介します。

## 方法1: Zoomで録音

**手順**

1. Zoomを起動します。まだ持っていない方は以下からダウンロードして下さい。
  https://zoom.us/download

2. 新規ミーティングを開始します。

3. 画面を共有を押します。

4. **[重要]** 画面一覧で上の「詳細」を選び、「コンピューターサウンドのみ」を選びます。

5. レコーディングを開始します。

6. ブラウザに戻ってGoogle Cloud Text-to-Speechにしゃべって貰います。

7. 終わったらZoomを閉じます。

8. 保存データのフォルダが開きます。もし自動で開かない場合は「Zoom レコーディング 保存先」とでもググって下さい。

9. audio_only.m4a というのが目的の音声データです。他はいらないです。

**補足など**

* 前後の無音部分を消したいという方は下記のおまけを見て下さい。

* 毎回Zoomを起動しては終了するのが少し面倒ですが、下手に録音用ソフトをあれこれ試すより多分簡単です。特に音量調節をZoom側で自動でやってくれるのが良いです。(私は以前、Windowsのサウンド設定でステレオミキサーを有効にし、Audacityで録音して、Effect > Normalizeで音量を大きくした後、サーサー音を消すためにEffect > Noise Reductionをかける、ということをやっていました。それと比べたら断然楽です。)

* あくまでデモ版を勝手に録音する形なので、ちょっと試すだけにした方が良いと思います。がっつり使いたい場合は方法2にすべきでしょう。

## 方法2: Google Colabを使う

** 手順**

1. Google Cloudに登録します。Text-to-Speechの画面の上の方の「無料で開始」または「無料トライアル」ボタンを押して下さい。

2. Text-to-Speechの「ドキュメントを見る」から「クイックスタート」を開き (実際は全然クイックじゃないです)、始める前にやることの1番から4番までをやります。確認していませんが、Google Colabを使うなら5番と6番は多分やらなくて良いと思います。
https://cloud.google.com/text-to-speech/docs/quickstart-client-libraries

3. Google Colabで新規ファイルを作ります。内容は以下をコピペして、先ほど入手したキーファイル名を変更して下さい (###キーファイル名に変更###と書いてある箇所)。読み原稿の入力ファイル名 (speech.txt), 出力ファイル名 (output.mp3), 声のタイプ (ja-JP-Wavenet-B) も適宜変更して下さい。

  ```
  # Install TTS and google-auth
  !pip install --upgrade google-cloud-texttospeech google-auth
  ```

  ```
  # upload file to google
  from google.colab import files
  uploaded = files.upload()
  ```

  ```
  # Create credential object and test access
  from google.oauth2 import service_account
  from google.cloud import texttospeech
  credentials = service_account.Credentials.from_service_account_file('###キーファイル名に変更###.json')
  texttospeech.TextToSpeechClient(credentials=credentials)
  ```

  ```
  # Load text file
  input_file_name = 'speech.txt'
  output_file_name = 'output.mp3'
  with open(input_file_name, 'r') as file:
      speech_str = file.read().replace('\n', ' ')

  # Convert text to speech

  # Instantiates a client
  client = texttospeech.TextToSpeechClient(credentials=credentials)

  # Set the text input to be synthesized
  synthesis_input = texttospeech.SynthesisInput(text=speech_str)

  # Build the voice request
  voice = texttospeech.VoiceSelectionParams(
        name='ja-JP-Wavenet-B',
        language_code='ja-JP')

  # Select the type of audio to file
  audio_config = texttospeech.AudioConfig(
      audio_encoding=texttospeech.AudioEncoding.MP3)

  # Perform the text-to-speech request on the text input with the selected
  # voice parameters and audio file type
  response = client.synthesize_speech(
      input=synthesis_input,
      voice=voice,
      audio_config=audio_config)

  # The response's audio_content is binary.
  with open(output_file_name, 'wb') as file:
      file.write(response.audio_content)
      print('Audio content written ' + output_file_name)
      files.download(output_file_name)
  ```

  このソースコードは以下のページを参考にしました。ここ半年で色々と書き方が変わったようですので、適宜修正しました。
  https://www.youtube.com/watch?v=hQGZHwyQOTg

4. 初回は最初のセルを実行して下さい。Google Colabの再起動が必要と言われたら従って下さい。再度実行して特にエラーが出なければOKです。以降は最初のセルは実行しなくて良いです。

5. 読み原稿の入力ファイルを用意し、ソースコード中で指定したのと同じ名前にして下さい (上の例ではspeech.txt)。メモ帳で良いです。文字コードはUTF-8にして下さい。

6. 2番目以降のセルを順に実行します。2番目の実行時にはキーファイルと入力ファイルの2つを選択してアップロードして下さい。入力ファイルの4番目のセルを実行するとmp3ファイルがダウンロード出来ます。

**補足など**

* 方法2は方法1と比べると初期設定がかなり面倒ですが、以降は比較的簡単に作業出来ると思います。

* 今後また書き方が変わればこのコードではエラーになると思います。その場合は自力で何とかして下さい。

* 方法1と違って前後に余計な無音部分がなく、データ容量も小さく、音質もこちらの方が少し良いです。

* 上記の手順の敷居が高くてどうしても無理という方向けに、音読さんを紹介しておきます。そもそも100万文字/月まで無料で使えるツールに何故わざわざお金を払う人がいるのか、何故それがビジネスとして成立するかというと、それだけ初期設定が面倒であり、それを肩代わりしてくれる分のお値段、ということなのでしょう。
  https://ondoku3.com/


## おまけ: 音声ファイルをPowerPointに入れる方法

* 音声ファイルをパワポにドラッグ&ドロップすると音声アイコンになります。

* そのままだとスライドショー中もアイコンが画面に表示され、クリックすると音が出る状態です。

* アイコンを消すには、スライドの枠外に移動すれば良いです。上の「オーディオツール」 > 「再生」タブより「スライドショーを実行中にサウンドのアイコンを隠す」にチェックしても良いです。

* スライドの切り替わりと同時に再生を開始させるには、上の「アニメーション」タブを開いて、開始を「クリック時」から「直前の動作の後」に変更すれば良いです。また、遅延を0以上にすると少し間をおいてから再生が開始されます。

* 方法1でデータを取得した場合は前後に無音部分が含まれますが、上の「オーディオツール」 > 「再生」タブより「オーディオのトリミング」を選んでカットすることが出来ます。

* スライドショーの記録をすると出現する音声アイコン (ナレーション) と、ドラッグ&ドロップしたら出現する音声アイコンは別物です。