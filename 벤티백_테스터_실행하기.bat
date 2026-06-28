@echo off
chcp 65001 > nul
title 벤티백(Venti Bag) 테스터
echo ===================================================
echo.
echo     벤티백 홈페이지 테스터 서버를 시작합니다.
echo     (처음 켤 때는 몇 초 정도 걸릴 수 있습니다)
echo.
echo ===================================================
echo.
echo 필요한 모듈을 확인하는 중...
call npm install
echo.
echo 서버를 시작하는 중...
echo.
call npm run dev
echo.
pause
