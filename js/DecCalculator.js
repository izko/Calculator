import { Calculator } from "./Calculator";

class DecCalculator extends Calculator{
  constructor(settings) {
      super(settings);
      console.log( this.getName() );
  }

    /* Method add numbers in two array
    *  @param {array} numberX First number
    *  @param {array} numberY Second number
    *  @return {array}
    */
    add(numberX, numberY) {
        let result = [0,0,0,0,0,0,0,0,0];
        for(let i = numberX.length - 1; i >= 0  ; i--) {
            let carryBit =  numberX[i] + numberY[i] + result[i];
            if( carryBit  >= 10) {
                result[i] = carryBit % 10;
                result[i-1] = 1;
            } else {
                result[i] = carryBit;
            }
        }
        return result;
    }

    /* Method changing number
    *  @param {jQuery element} root Parent element
    */
    changeNumber(root) {
        let activeElement = root.find('.active');
        activeElement.removeClass("active");
        activeElement.attr('contenteditable', true);
        activeElement.empty();
        activeElement.addClass('active');
        root.children(":first-child").trigger('focus');
    }

    initEvents() {
         this.$calculatorDOMElement.find(".display-number").on('click', (event) => {
             const parentLabel = $(event.target).parent(".display-number");
             this.changeNumber(parentLabel);
         })
         this.$calculatorDOMElement.find('.operator-bar span').on('click', (event) => {
             this.checkNumber();
             this.updateResult();
         })
    }

    /* Method changing Result
    */
    updateResult() {
         let root =  this.$calculatorDOMElement;
         let $resultNumber = root.children(".group-number").children(".result-bit");
         for(let i =  this.resultNumberArray.length - 1, j = 0; i >= 0 ; i--, j++) {
            let valueResult = parseInt( $resultNumber.eq(j).find(".active").text(this.resultNumberArray[i]) );
         }
    }
}

export { DecCalculator  };
