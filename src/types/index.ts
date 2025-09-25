export interface Store {
  id: number;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  login?: string;  // The token is in the 'login' field
  user?: any;
  token?: string;
  access_token?: string;
  data?: {
    token?: string;
    user?: any;
  };
  success?: boolean;
  message?: string;
}

export enum UploadStatus {
  Pending = 'pending',
  Uploading = 'uploading',
  Done = 'done',
  Error = 'error'
}

export interface UploadFile {
  file: File;
  name: string;
  progress: number;
  status: UploadStatus;
  result?: UploadResult;
  error?: ValidationError;
}

export interface ValidationError {
  message: string;
  details?: ValidationDetail[];
}

export interface ValidationDetail {
  field: string;
  description: string;
}

export interface UploadResult {
  order: {
    id: number;
    asnId: string;
    name: string;
    status: string;
    quantity: number;
    scanned: number;
    storeId: number;
    cost: string;
    paid: string;
    cases: number;
    items: UploadItem[];
    updatedAt: string;
    createdAt: string;
    notes?: string;
    orderAt?: string;
    completedAt?: string;
    DispensaryId: number;
  };
}

export interface UploadItem {
  sku: string;
  name: string;
  brand: string;
  price: number;
  batchLot: string;
  caseGTIN: string;
  eachGTIN: string;
  quantity: number;
  subTotal: number;
  updatedAt: number;
  barcodeGTIN: string;
  casesScanned: number;
  unitsScanned: number;
  uomConversion: number;
  packagedOnDate: string;
  uomConversionQuantity: number;
}