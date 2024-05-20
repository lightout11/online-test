from locust import task, run_single_user
from locust import FastHttpUser


class localhost(FastHttpUser):
    host = "http://localhost:3000"
    default_headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9,en-GB;q=0.8,vi;q=0.7",
        "Cache-Control": "max-age=0",
        "Connection": "keep-alive",
        "Host": "localhost:3000",
        "Referer": "http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
        "sec-ch-ua": '"Chromium";v="124", "Microsoft Edge";v="124", "Not-A.Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
    }

    @task
    def t(self):
        with self.client.request(
            "POST",
            "/api/auth/callback/credentials",
            headers={
                "Content-Length": "123",
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": "authjs.csrf-token=82f8861235ea7cbc6d83cc7f93089231ef564bc1bd233b1d2944279d797cd740%7C5452b70b0e676cedc6268cfe0c97c88eb04adf5fec3a60193763dd76099a8e24; authjs.callback-url=http%3A%2F%2Flocalhost%3A3000%2F; arp_scroll_position=0",
                "Origin": "http://localhost:3000",
            },
            data="csrfToken=82f8861235ea7cbc6d83cc7f93089231ef564bc1bd233b1d2944279d797cd740&email=lightout01%40outlook.com&password=06112001",
            catch_response=True,
        ) as resp:
            pass
        with self.client.request(
            "GET",
            "/",
            headers={
                "Cookie": "authjs.csrf-token=82f8861235ea7cbc6d83cc7f93089231ef564bc1bd233b1d2944279d797cd740%7C5452b70b0e676cedc6268cfe0c97c88eb04adf5fec3a60193763dd76099a8e24; authjs.callback-url=http%3A%2F%2Flocalhost%3A3000%2F; arp_scroll_position=0; authjs.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiTnpVRU1pS2hFM2ZqOGNqem5YN2UzVjZHa2swbEU2R25oeU4tRUF2SlRZaUREYmczX056dXlxQWtEZV9EWnpzQUlYd2FHSWpFNDdsekFTWXFmemVhN3cifQ..pTVK7jLO1OYAhIZDlxFl3A.kLkKErd0OU5q5Q3YhtyC08EHlVPd2apl2m3W4LQTQDIRa7ovT6Yp09noNpT2ebFiNWmxJn64n0s-eHbYQxoeLf793fSAW8kPGH0pLGLKo7WNA7SkVmhfsSfaTzJ6B4OVMW5zG1T3acc_c64q4ZEezrEA2RoMuFXtZZ2xtg0z8_OUseyubxMRoJwqdZ9xW_K2oT0A4aZGEU8MCb1A3_fONOdSd58o1PhEdBGLfy_KSDqxsmrlqhlII6IFmXBzFZh9-QWT8lX32WlYBxrXORMz5g.CTHjbeBo2EHECc-X1sf_DjDWDrhxlap5Lp_pk-buQ50"
            },
            catch_response=True,
        ) as resp:
            self.client.get("/")
            self.client.get("/register")
            self.client.get("/api/auth/signin")
            self.client.get("/manage/questions")
            self.client.get("/manage/questions/new")
            self.client.get("/manage/tests")
            self.client.get("/manage/tests/new")
            self.client.get("/account")


if __name__ == "__main__":
    run_single_user(localhost)
