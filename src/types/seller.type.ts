import { BisnisType } from "@prisma/client";

export interface SellerRequestBody {
  userId: string;
  nama_usaha: string;
  tipe_usaha: BisnisType;
  deskripsi?: string;

  // info
  no_tlp: string;
  address: string;
  city: string;
  province: string;
  postalCode?: string;
  country: string;

  // image
  KTP: string;

  // BANK INFO
  bankName: string;
  bankAccount: string;
  accountHolder: string;

  // identitas
}
