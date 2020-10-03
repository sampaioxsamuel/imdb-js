export default class Modal{
    constructor(text, msgClose) {
      this.text = text;
      this.msgClose = msgClose;
    }
  
    createElement(){
      this.section = document.createElement('section')
      this.div = document.createElement('div');
      this.textModal = document.createElement('p');
      this.closeBtn = document.createElement('a');
  
      this.section.classList.add('modal-container');
    
      this.textModal.innerText = this.text;
      this.closeBtn.innerText = this.msgClose;
      this.closeBtn.setAttribute('href', '#');
      
      this.div.classList.add('modal');
      this.div.appendChild(this.textModal);
      this.div.appendChild(this.closeBtn);
    
      this.section.appendChild(this.div);
      this.addCloseEvent();
      return this.section;
    }
  
    addCloseEvent(){
      this.closeBtn.addEventListener('click', () => {
        this.section.style.visibility = 'hidden';
      })
    }
  
  }