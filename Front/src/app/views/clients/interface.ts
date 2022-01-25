
export interface UserData {
    client_address: string;
    client_date: Date;
    client_dni: string;
    client_firstname: string;
    client_lastname: string;
    client_reference: string;
    pk_client: number;
    mobile: Mobiledata;
}

export interface Mobiledata {
    pk_mobile: number;
    mobile_marca: string;
    mobile_model: string;
    mobile_year: string;
    mobile_date: Date;
    mobile_color: string;
    mobile_inch: number;
    mobile_IMEI: string;
    repair: RepairData
}

export interface RepairData {
    pk_repair: number;
    reapir_ingr: Date;
    repair_sali: Date;
    reapir_desc_ingr: string;
    repair_desc_sali: string;
    fk_mobile: number;
}