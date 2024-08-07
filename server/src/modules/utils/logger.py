from requests import PreparedRequest, Response
from flask import current_app, g

def log_format(method_or_status: str, url: str, body:str) -> str:
    return f"[{method_or_status}] {url} body: {body or ''}"
  
def format_incoming_request(method: str, url: str, body: str) -> str:
    return f"inbound({g.user_email or ''}) - {log_format(method, url, body)}"
  
def format_outgoing_response(url: str, response: Response) -> str:
    return f"outgoing({g.user_email or ''}) - {log_format(str(response.status_code), url, str(response.json))}"
  
def format_request(request: PreparedRequest) -> str:
    return f"request({g.user_email or ''}) - {log_format(request.method, request.url, request.body)}"
  
def format_response(response: Response) -> str:
    return f"response({g.user_email or ''}) - {log_format(response.status_code, response.url, response.text)}"
  
def format_exception(exception) -> str:
    return f"exception({g.user_email or ''}) - {exception}"

class Log:
    @staticmethod
    def incoming_request(method: str, url: str, body: str):
        current_app.logger.info(format_incoming_request(method, url, body))
      
    @staticmethod
    def outgoing_response(url: str, response: Response):
        current_app.logger.info(format_outgoing_response(url, response))
      
    @staticmethod
    def http_request_response(response: Response):
        current_app.logger.info(format_request(response.request))
        current_app.logger.info(format_response(response))
      
    @staticmethod
    def exception(exception):
        current_app.logger.error(format_exception(exception))
      
    @staticmethod
    def unhandled_exception(exception):
        current_app.logger.exception(exception)

      