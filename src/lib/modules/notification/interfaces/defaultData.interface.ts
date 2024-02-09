import { IndividualConfig } from "ngx-toastr";

export interface DefaultData {
    body: string;
    title: string;
    extraOptions: Partial<IndividualConfig<any>> | undefined;
}