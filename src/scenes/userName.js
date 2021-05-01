import 'phaser';

export default class UserName extends Phaser.Scene{

  constructor(){
    super('userName')
  }

  create() {
    this.add.text(150, 100, 'Please Enter Your Name:');
    this.input = this.add.dom(250, 150, 'input');
    this.submit = this.add.dom(250, 200, 'button', 'padding:20px;background-color:gray;', 'Submit');

    this.btn = document.querySelector('button');
    this.btn.addEventListener('click', () => {
      this.inputValue = document.querySelector('input').value;
      if (this.inputValue == null || this.inputValue === '') {
        localStorage.setItem('username:', JSON.stringify('Nameless'));
      } else {
        localStorage.setItem('username:', JSON.stringify(this.inputValue));
      }
      this.scene.start('mainScene');
    });
  }

}