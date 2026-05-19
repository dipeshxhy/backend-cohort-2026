export class APIResponse {
  success = true;

  constructor(message, data) {
    this.message = message;
    this.data = data;
  }
  static ok(res, data, message = 'Success') {
    return res.status(200).json(new APIResponse(message, data));
  }

  static created(res, data, message = 'Resource created successfully') {
    return res.status(201).json(new APIResponse(message, data));
  }

  static noContent(res, message = 'No content') {
    return res.status(204).end();
  }
}
