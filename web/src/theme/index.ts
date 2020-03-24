import { createMuiTheme } from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';
import blueGrey from '@material-ui/core/colors/blueGrey';
import common from '@material-ui/core/colors/common';


export const theme = createMuiTheme({
    palette: {
        primary: blueGrey,
        secondary: red,
        background: {
            default: common.white,
            paper: common.white
        },
        // text: {
        //     primary: common.black,
        //     secondary: common.black,
        //     disabled: common.black,
        //     hint: common.black,
        // }
    },
});

// primary?: PaletteColorOptions;
//   secondary?: PaletteColorOptions;
//   error?: PaletteColorOptions;
//   warning?: PaletteColorOptions;
//   info?: PaletteColorOptions;
//   success?: PaletteColorOptions;
//   type?: PaletteType;
//   tonalOffset?: number;
//   contrastThreshold?: number;
//   common?: Partial<CommonColors>;
//   grey?: ColorPartial;
//   text?: Partial<TypeText>;
//   divider?: string;
//   action?: Partial<TypeAction>;
//   background?: Partial<TypeBackground>;
//   getContrastText?: (background: string) => string;