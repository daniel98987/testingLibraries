

export interface ConfirmData {
    title?: string;
    body?: string;
    width?: string;
    height?: string;
    labelCancel?: string;
    labelAccept?: string;
  }
  
  export interface AlertData {
    title: string;
    body: string;
    width?: string;
    height?: string;
    labelAccept?: string;
  }
  
  export interface ChoiceData {
    disableClose: boolean;
    width?: string;
    height?: string;    
    title?: string;
    body?: string;
    type?: string;
    labelKey?: string;
    choices?: any;// Array<string | number | { label: string | number , type: string|number}>;
    labelCancel?: string;
    labelAccept?: string;
  }
  
  export interface CustomData {
    title: string;
    component: any;
    width?: string;
    height?: string;
    data?: any;
    minWidth?: any;
    minHeight?: any;
    resizable?: boolean;
    move?: boolean;
  }