from locust import HttpUser, task

class Test(HttpUser):
    @task
    def test(self):
        self.client.get("/")
        self.client.get("/register")
        self.client.get("/api/auth/signin")
        self.client.get("/manage/questions")
        self.client.get("/manage/questions/new")
        self.client.get("/manage/tests")
        self.client.get("/manage/tests/new")
        self.client.get("/account")