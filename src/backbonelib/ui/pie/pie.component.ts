import { Component } from "../../component/component";
import { pie } from "./pie.tplt";

export class PieUi extends Component{
    pieName:string;
    public constructor(params:any)
    {
       

        params['templateUrl']=pie;
        super(params);
        this.pieName ="pie_"+ Math.random();
        this.pieName = this.pieName.replace('.','');
        this.model.set('pieID',this.pieName);
    }

    public Update(percent, donut) {
            percent = Math.round(percent);
            var el = this.pieName;
            if (percent > 100) {
                percent = 100;
            } else if (percent < 0) {
                percent = 0;
            }
            var deg = Math.round(360 * (percent / 100));

            if (percent > 50) {
                $(el + ' .pie').css('clip', 'rect(auto, auto, auto, auto)');
                $(el + ' .right-side').css('transform', 'rotate(180deg)');
            } else {
                $(el + ' .pie').css('clip', 'rect(0, 1em, 1em, 0.5em)');
                $(el + ' .right-side').css('transform', 'rotate(0deg)');
            }
            if (donut) {
                $(el + ' .right-side').css('border-width', '0.1em');
                $(el + ' .left-side').css('border-width', '0.1em');
                $(el + ' .shadow').css('border-width', '0.1em');
            } else {
                $(el + ' .right-side').css('border-width', '0.5em');
                $(el + ' .left-side').css('border-width', '0.5em');
                $(el + ' .shadow').css('border-width', '0.5em');
            }
            $(el + ' .num').text(percent);
            $(el + ' .left-side').css('transform', 'rotate(' + deg + 'deg)');
        }
}