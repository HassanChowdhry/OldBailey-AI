# OldBailey AI

OldBailey AI is a project developed to assist researchers and historians by providing insights into historical trends, facilitating data analysis, and offering an immersive experience through role-play. This AI leverages OpenAI to analyze the Old Bailey dataset, utilizing prompt engineering to create an AI capable of analyzing historic trends, generating tables, and role-playing as people from that era.

## Table of Contents

- [OldBailey AI](#oldbailey-ai)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contact](#contact)
  - [References](#references)
  - [Ideas](#ideas)

## About

OldBailey AI is designed to enhance historical research by offering advanced data analysis and immersive role-play capabilities. By analyzing the Old Bailey dataset, this AI provides valuable insights into historical trends and helps users explore history in a more interactive and engaging way.

## Technologies Used

- **Frontend:**
  - Next.js
  - TypeScript
  - SCSS/SASS

- **Backend:**
  - Flask
  - Python
  - Docker

- **Database:**
  - MongoDB

- **AI Integration:**
  - OpenAI

## Features

- **Historical Data Analysis:** Provides insights into historical trends by analyzing the Old Bailey dataset.
- **Interactive Role-Play:** Allows users to role-play as people from the historical era, enhancing the immersive experience.
- **Data Visualization:** Generates tables and visualizations to facilitate data analysis.
- **Prompt Engineering:** Utilizes advanced prompt engineering to maximize the capabilities of OpenAI.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/HassanChowdhry/OldBailey-AI.git
   ```

2. Navigate to the project directory:

   ```bash
   cd app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a virtual environment:

   ```bash
   python3 -m venv venv
   ```

5. Activate the virtual environment:

   ```bash
   source venv/bin/activate
   ```

6. Install the Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

7. Start the development server:

   ```bash
   python3 run.py
   ```

## Usage

You can access the application by navigating to `http://localhost:3000` in your web browser. Explore the various features and capabilities offered by OldBailey AI.

## Contact

Feel free to reach out to me for any professional inquiries or questions:

- **Email:** [hassan.chowdhry@dal.ca](mailto:hassan.chowdhry@dal.ca)
- **LinkedIn:** [Hassan Chowdhry](https://linkedin.com/in/hassanchowdhry)
- **Website:** [HassanChowdhry.live](http://hassanchowdhry.live)

## References

Tim Hitchcock, Robert Shoemaker, Clive Emsley, Sharon Howard and Jamie McLaughlin, et al., The Old Bailey Proceedings Online, 1674-1913 ([www.oldbaileyonline.org](www.oldbaileyonline.org), version 9.0, Autumn 2023).

---

Thank you for exploring OldBailey AI!

## Ideas

Future Features:

- 2FA
- Localization
- IAM ; User Roles (to support paid plans & permissions)
- User preferences
- Email verification
- User notifications (newsletters, updates, etc.)

Feedback:

- Use Poetry
- Dockerize the App (Backend, Frontend & MongoDB)
- Have a local vs production setup (local should run in debug mode)
- Look into DB ORM.
- Introduce Checkstyles (Pylint)
- Intoduce static-type checking (MyPy)
- Introduce test coverage
- Introduce Unit Testing (PyTest)
- Introduce Integration Testing (PyTest)
- Introduce CI/CD
- Introduce proper logging (info, warning, error) & metrics
- Introduce monitoring (alert system)
- Do the token authentication & refresh in interceptor/middleware
