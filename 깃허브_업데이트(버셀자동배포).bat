@echo off
chcp 65001 > nul
title 벤티백 깃허브 자동 업데이트 (Vercel 배포)
echo ===================================================
echo.
echo     벤티백 코드를 깃허브(GitHub)에 저장합니다.
echo     저장이 완료되면 Vercel에 자동으로 반영됩니다.
echo.
echo ===================================================
echo.
echo 1. 변경된 파일 찾는 중...
call git add .
echo.
echo 2. 깃허브에 저장 기록 남기는 중...
call git commit -m "update: ventibag full homepage update and images fix"
echo.
echo 3. 깃허브로 전송 중... (잠시 대기해주세요)
call git push
echo.
echo ===================================================
echo     전송 완료! 
echo     이제 1~2분 뒤에 Vercel 주소로 접속하시면 
echo     최신 홈페이지를 보실 수 있습니다.
echo ===================================================
pause
