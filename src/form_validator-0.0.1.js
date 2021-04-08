//フォームバリデーション
class FormValidator{
  constructor(form){
    this.form = form;
  }
  initialize() {
    this.validateOnEntry();
  }
  //イベントリスナーを登録
  validateOnEntry(){
    let self = this;
    const vc = self.form.getElementsByClassName("valid-control");
    Array.from(vc).forEach(function(e){
      e.addEventListener('input',function(){
        self.validateFields(this);
      });
    });
  }
  //各バリデーション項目
  validateFields(field) {

    let error_count = 0;

    if(field.getAttribute('type')==='text'){
      //テキスト入力の場合-------------
      if(
        field.getAttribute('data-valid-required') &&
        field.value.trim() === ""
      ){
        //必須項目のチェック
        this.setStatus(field, `${field.previousElementSibling.innerText} は必須項目です。`, "error");
        ++error_count;
      }
      if(
        field.getAttribute('data-valid-kana') &&
        field.value.trim().match(/[^ァ-ヶー　]+$/)
      ){
        //カナチェック
        this.setStatus(field, `${field.previousElementSibling.innerText} は全角のカタカナで入力してください。`, "error");
        ++error_count;
      }

    }else if(field.getAttribute('type')==='radio'){

      //ラジオボタンの場合-------------
      if(field.getAttribute('data-valid-required')){
        //必須項目のチェック
        let nocheck = true;
        let name = field.getAttribute('name');
        const elms = document.getElementsByName(name);
        Array.from(elms).forEach(function(self){
          if(self.checked){
            nocheck = false;
          }
        });
        if(nocheck){
          this.setStatus(field, `この選択肢は必須項目です。`, "error");
          ++error_count;
        }
      }
    }

    //すべてクリアでOK
    if(error_count===0){
      this.setStatus(field, null, "success");
    }

  }

  setStatus(field, message, status) {
    const successIcon = field.closest('.valid-form-wrap').querySelector('.valid-icon-success');
    const errorIcon = field.closest('.valid-form-wrap').querySelector('.valid-icon-error');
    const errorMessage = field.closest('.valid-form-wrap').querySelector('.valid-error-message');

    if (status === "success") {
      if (errorIcon) { errorIcon.classList.add('valid-hidden') }
      if (errorMessage) { errorMessage.innerText = "" }
      if (successIcon) { successIcon.classList.remove('valid-hidden')}
      field.classList.remove('valid-input-error')
    }

    if (status === "error") {
      if (successIcon) { successIcon.classList.add('valid-hidden') }
      errorMessage.innerText = message
      if (errorIcon) {errorIcon.classList.remove('valid-hidden') }
      field.classList.add('valid-input-error')
    }
  }
}
const form = document.querySelector('.form');
const validator = new FormValidator(form);
validator.initialize();
