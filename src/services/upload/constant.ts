export enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export enum UploadConst {
    SUCCESS = 'Success',
    NOT_FOUND = 'File not found',
    FAILURE = 'Failure',
    INVALID_STATUS = 'Invalid status',
    TODAY_CLIP_UPLOADED = 'You can upload only one video every 24 hours.'
 }