#include "wifi_handler.h"
#include <WiFi.h>
#include "time.h"

const char* ntpServer = "ntp.aliyun.com" ;
const long gmtOffset_sec = 8 * 3600;      // 东八区偏移：8小时 * 3600秒
const int   daylightOffset_sec = 0;        // 中国没有夏令时

void setupWIFI(const char* ssid, const char* password) {
    Serial.printf("正在连接wifi： %s", ssid);
    WiFi.begin(ssid, password);

    // 来一个循环连接，如果不行就自动跳出断开结束运行
    while ()
};
