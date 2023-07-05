# Sales Automessaging

Responsible for the automated confirm messages sent by our Sales Team to meetings scheduled with our Customers.

This function is scheduled to run each hour, fetching the Google Agenda for each Sale colleague, get Customer information on RD CRM based on event's attendees, then finally impersonate the Sales person on Whatsapp.

---

## Stack

[AWS Lambda](https://docs.aws.amazon.com/lambda/?icmpid=docs_homepage_compute)

[Typescript](https://www.typescriptlang.org/docs/handbook/intro.html)

---

## Local Development

### Pre-requisites

1. Install [Docker Engine](https://docs.docker.com/engine/install/) or [Docker Desktop](https://docs.docker.com/desktop/)

2. Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

3. Install [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)

4. Install Node 18.x

> Recommended to install the repository VSCode Extensions

### Start Locally

1. Run `npm start`

---

## Known Issues

**This is a title example**

> Then describe the issue

Finally describe the solution
