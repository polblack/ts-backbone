import { ModbusOnline , ModbusHolding ,InverterModubsInfo } from "../../../modbus/inverterdefs";
import { UserLevel } from "../../../../backbonelib/ulevel/userlevelmodule";

let MockInfo:InverterModubsInfo={
    data:[],
    holding:[{
            add:10,
            start:0,
            len:null,
            ur:UserLevel.Basic,
			uw:UserLevel.Basic,
            tid:"L-5",
            ty:"CSTM__2",
            of:null,//Output format
            m:"key1",
            cat:"cat 1 holding",
            flgs:0,
            sk:0
        },
         {
            add:10,
            start:3,
            len:null,
            ur:UserLevel.Installer,
			uw:UserLevel.Installer,
            tid:"L-7",
            ty:"uint32",
            of:"b",//Output format
            m:"key1",
            cat:"cat 2 holding",
            flgs:0,
            sk:0
        }, {
            add:10,
            start:3,
            len:null,
            ur:UserLevel.Installer,
			uw:UserLevel.Installer,
            tid:"L-7",
            ty:"uint32",
            of:"b",//Output format
            m:"key1",
            cat:"cat 2 holding",
            flgs:0,
            sk:0
        }, {
            add:10,
            start:3,
            len:null,
            ur:UserLevel.Installer,
			uw:UserLevel.Installer,
            tid:"L-7",
            ty:"uint32",
            of:"b",//Output format
            m:"key1",
            cat:"cat 2 holding",
            flgs:0,
            sk:0
        }, {
            add:10,
            start:3,
            len:null,
            ur:UserLevel.Installer,
			uw:UserLevel.Installer,
            tid:"L-7",
            ty:"uint32",
            of:"b",//Output format
            m:"key1",
            cat:"cat 2 holding",
            flgs:0,
            sk:0
        }
        ],
    online: [
        {
            add:10,
            start:0,
            len:null,
            u:UserLevel.Basic,
            tid:"L-1",
            ty:"CSTM__2",
            of:null,//Output format
            m:"key1",
            cat:"cat 1",
            flgs:0,
            sk:0
        },
         {
            add:10,
            start:3,
            len:null,
            u:UserLevel.Installer,
            tid:"L-3",
            ty:"uint32",
            of:"b",//Output format
            m:"key1",
            cat:"cat 2",
            flgs:0,
            sk:0
        }
    ],
    langs:
    {
        "ENGLISH":{
            "L-0" : "Type of Battery",
			"L-1" : "Lead-Acid",
			"L-2" : "Lithium : Forsee XSYST 7kWh",
			"L-3" : "Lithium : Cegasa STLI11",
			"L-4" : "Lithium : Saft Synerion 48E",
			"L-5" : "Lithium : Forsee HE 48V",
			"L-6" : "Lithium : LG Resu LV Series 48V",
			"L-7" : "Lithium : Zetta Joule 150",
			"L-8" : "Lithium : Freedom Lite Home 48V",
			"L-9" : "Ingeteam RS485 Protocol",
			"L-10" : "Ingeteam CAN Protocol",
			"L-11" : "Lithium : Freedom Lite HV Series",
			"L-12" : "CAN Baud Rate for BMS",
			"L-13" : "125 kb/s",
			"L-14" : "250 kb/s",
			"L-15" : "500 kb/s"
        },
		"SPANISH" : {
			"L-0" : "Type of Battery",
			"L-1" : "Manolo",
			"L-2" : "Lithium : Forsee XSYST 7kWh",
			"L-3" : "Lithium : Cegasa STLI11",
			"L-4" : "Lithium : Saft Synerion 48E",
			"L-5" : "Lithium : Forsee HE 48V",
			"L-6" : "Lithium : LG Resu LV Series 48V",
			"L-7" : "Lithium : Zetta Joule 150",
			"L-8" : "Lithium : Freedom Lite Home 48V",
			"L-9" : "Ingeteam RS485 Protocol",
			"L-10" : "Ingeteam CAN Protocol",
			"L-11" : "Lithium : Freedom Lite HV Series",
			"L-12" : "CAN Baud Rate for BMS",
			"L-13" : "125 kb/s",
			"L-14" : "250 kb/s",
			"L-15" : "500 kb/s"
		}
    },
    customtypes : {
		"CSTM__1" : {
			"values" : {
				"0" : "L-1",
				"1" : "L-2",
				"2" : "L-3",
				"3" : "L-4",
				"4" : "L-5",
				"5" : "L-6",
				"6" : "L-7",
				"7" : "L-8",
				"8" : "L-9",
				"9" : "L-10",
				"10" : "L-11"
			},
			"btype" : "ushort"
		},
		"CSTM__2" : {
			"values" : {
				"125" : "L-13",
				"250" : "L-14",
				"500" : "L-15"
			},
			"btype" : "ushort"
		}
    }

}
export default MockInfo;