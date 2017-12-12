@echo off
if "%1"=="" goto MissingArgument

:Compile
node lib\\CLI.js compile %1
REM TODO build/ might not be the output directory. It's defined in fractive.json
node node_modules\\http-server\\bin\\http-server %1/build
exit /b %errorlevel%

:MissingArgument
echo "Usage: publish.bat path/to/story/directory/"
exit /b 1
