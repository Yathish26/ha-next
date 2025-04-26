const TermSheet = [
    { id: 1, title: 'Acceptance of Terms', p: 'By accessing this website or using the services provided by Hire Arrive, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, you must refrain from using our services.' },
    { id: 2, title: 'Services Provided', p: 'Hire Arrive is a service platform that facilitates connections between retailers, other stores, and independent freelancers. Our services include:', p1: 'Providing skilled workers and freelancers to businesses and individuals.', p2: 'Offering freelance opportunities for the public, allowing individuals to offer their services on a project basis.' },
    { id: 3, title: 'Retailers, Stores, and Business Partners', p: 'Hire Arrive works with all types of retailers and other businesses, offering access to skilled workers and freelancers.', p1: 'Businesses using our platform are responsible for clearly outlining their project requirements, schedules, and payment terms when hiring freelancers.', p2: 'Hire Arrive is not responsible for the quality of work provided by freelancers or the fulfillment of business obligations by retailers.' },
    { id: 4, title: 'Freelancers and Independent Contractors', p: 'Freelancers on Hire Arrive are independent contractors and not employees of Hire Arrive.', p1: 'Freelancers are responsible for complying with all applicable tax laws and regulations in their jurisdiction.', p2: 'Freelancers must provide accurate and professional services, and all work must comply with legal standards and the agreements made with retailers or clients.', p3: 'Hire Arrive does not control how services are delivered but offers a platform for connection.' },
    { id: 5, title: 'User Obligations', p: 'All users, including businesses and freelancers, agree to provide accurate and complete information when registering for our services.', p1: 'Users agree not to misuse the platform by engaging in prohibited activities, such as spamming, uploading harmful content, or providing false information.' },
    { id: 6, title: 'Use of Personal Data', p: 'We value your privacy and are committed to protecting your personal data. Any personal information collected will be used solely for the purpose of providing services through the Hire Arrive platform. We will not share your data with third parties unless required by law. For more information, please refer to our Privacy Policy.' },
    { id: 7, title: 'Intellectual Property', p: 'All content, trademarks, and logos displayed on the Hire Arrive platform are the property of Hire Arrive or its licensors. Users are prohibited from copying, distributing, or using any content without prior written permission.' },
    { id: 8, title: 'Limitation of Liability', p: 'Hire Arrive is not responsible for any direct, indirect, or consequential damages arising from the use of our platform or services provided by freelancers or businesses. Users agree to use the platform at their own risk.' },
    { id: 9, title: 'Dispute Resolution', p: 'In case of any dispute between a freelancer and a business or retailer, Hire Arrive may offer mediation services but is not obligated to resolve disputes. Users are encouraged to settle disputes amicably or seek legal recourse if necessary.' },
    { id: 10, title: 'Governing Law', p: 'These terms and conditions are governed by and construed in accordance with the laws of Karnataka High Court, and you submit to the non-exclusive jurisdiction of the courts located in Karnataka for the resolution of any disputes.' },
    { id: 11, title: 'Amendments to Terms', p: 'Hire Arrive reserves the right to modify these terms and conditions at any time. Any changes will be posted on our website and will become effective immediately upon posting.' },
    { id: 12, title: 'Termination of Service', p: 'Hire Arrive reserves the right to terminate access to its platform or services for any user who violates these terms or engages in unlawful behavior.' },
    { id: 13, title: 'Service Availability', p: 'Hire Arrive aims to ensure the platform is available 24/7, but we do not guarantee uninterrupted or error-free service.', p1: 'Maintenance or system upgrades may require temporary suspension of services, and Hire Arrive will notify users when possible.', p2: 'Hire Arrive is not responsible for any unavailability due to technical issues outside of its control, including internet service provider outages, cyber-attacks, or force majeure events.' },
    { id: 14, title: 'Non-Solicitation Agreement', p: 'Users of the platform, including businesses and freelancers, agree not to solicit or hire other users of Hire Arrive for services outside of the platform without the platform’s express permission.', p1: 'Violations of this clause may result in termination of accounts or legal action.' },
    { id: 15, title: 'User Account and Security', p: 'Users are responsible for maintaining the confidentiality of their account information, including usernames and passwords. You agree to notify Hire Arrive immediately if your account is compromised or if you suspect unauthorized use.', p1: 'Hire Arrive is not liable for any losses or damages arising from unauthorized access to your account, except in cases of platform negligence.' },
    { id: 16, title: 'Feedback and Reviews', p: 'After the completion of a service, businesses and freelancers may leave feedback or reviews for each other.', p1: 'All feedback must be honest and accurate. Hire Arrive reserves the right to remove false, defamatory, or inappropriate reviews.', p2: 'Users agree that Hire Arrive may use feedback or reviews for promotional purposes, either on our platform or in external marketing materials.' },
    { id: 17, title: 'Confidentiality', p: 'Users agree not to disclose or use for their benefit any confidential information gained through the Hire Arrive platform, including, but not limited to, client details, project specifics, or proprietary business practices.', p1: 'Freelancers and businesses are expected to respect the confidentiality of any trade secrets, strategies, or private data shared during a project.' },
    { id: 18, title: 'Indemnification', p: 'You agree to indemnify, defend, and hold harmless Hire Arrive and its affiliates, employees, and agents from any claims, damages, losses, or liabilities, including legal fees, arising out of your use of the platform or violation of these terms.', p1: 'This includes disputes between businesses and freelancers, as well as any legal actions stemming from the performance or non-performance of services.' },
    { id: 19, title: 'Intellectual Property Rights of Work Performed', p: 'For any work performed by freelancers on the Hire Arrive platform, the intellectual property rights associated with that work shall be transferred to the business or client upon full payment, unless otherwise agreed upon.', p1: 'Freelancers must ensure that any work they provide is original and does not infringe upon any third-party intellectual property rights. In case of any such infringement, the freelancer will bear the full legal responsibility.' },
    { id: 20, title: 'Entire Agreement', p: 'These terms, together with the Privacy Policy and any other legal notices published on the Hire Arrive website, constitute the entire agreement between you and Hire Arrive regarding the use of our services.', p1: 'Any amendments or changes to these terms will only be valid if agreed to in writing by both parties or posted directly on the Hire Arrive website.' },
    { id: 21, title: 'Data Security and User Responsibilities', p: 'Hire Arrive implements industry-standard security measures to protect users’ personal and financial data. However, users acknowledge that no system is completely secure and agree to use the platform at their own risk.', p1: 'Users are responsible for the security of their login credentials and must notify Hire Arrive immediately if they suspect any unauthorized use of their account.', p2: 'Hire Arrive is not liable for any loss of data or unauthorized access to user accounts due to user negligence or security breaches beyond Hire Arrive’s control.' },
    { id: 22, title: 'Ownership of Platform and Technology', p: 'The platform, including its website, mobile applications, underlying code, and algorithms, is the exclusive property of Hire Arrive.', p1: 'Users agree not to attempt to reverse engineer, decompile, or tamper with the platform’s technology in any way.', p2: 'Hire Arrive reserves the right to modify, suspend, or discontinue any part of the platform or its functionality without notice. Users agree that Hire Arrive is not liable for any changes or disruptions to the service.' },
    { id: 23, title: 'Prohibited Activities', p: 'Users agree not to engage in any of the following prohibited activities on the platform:', p1: 'Impersonating any person or entity or falsely stating or otherwise misrepresenting your affiliation with a person or entity.', p2: 'Engaging in fraud, abusive behavior, harassment, or discriminatory behavior towards other users.', p3: 'Attempting to interfere with the proper functioning of the platform by hacking, uploading malware, or other means.', p4: 'Posting or sharing any content that is defamatory, obscene, sexually explicit, hateful, or unlawful.', p5: 'Hire Arrive reserves the right to terminate any account found in violation of these rules and report such actions to the appropriate authorities if necessary.' },
    { id: 24, title: 'Reporting Violations', p: 'Users are encouraged to report any violations of these terms and conditions, including misconduct by other users, fraudulent activities, or security breaches, to Hire Arrive’s support team immediately.', p1: 'Hire Arrive will investigate any reports in a timely manner and take appropriate action, including account suspension or termination if necessary.' },
    { id: 25, title: 'Age Restrictions', p: 'Hire Arrive’s platform is intended for users who are at least 18 years old. By using the platform, you represent and warrant that you are of legal age to form a binding contract.', p1: 'If you are under 18 years of age, you may not use the platform without the supervision of a parent or guardian.' },
    { id: 26, title: 'Termination of Accounts', p: 'Hire Arrive reserves the right to terminate or suspend user accounts at its sole discretion, with or without notice, for any reason including but not limited to:', p1: 'Breaching these terms and conditions.', p2: 'Engaging in prohibited activities or misconduct.' },
    { id: 27, title: 'Cookies and Tracking Technologies', p: 'Hire Arrive uses cookies and similar tracking technologies to enhance user experience, track performance, and personalize content. By using our platform, you agree to our use of cookies.', p1: 'You can control your cookie preferences in your browser settings.' },
    { id: 28, title: 'Communication and Support', p: 'Hire Arrive will provide users with customer support through email or in-platform messaging during business hours. We aim to respond to inquiries within 48 hours.', p1: 'Users are responsible for providing accurate and up-to-date contact information for communications. Hire Arrive is not liable for any missed communications due to incorrect or outdated contact details.', p2: 'Urgent matters can be escalated through specific channels designated by Hire Arrive for critical support.' },
    {
        "id": 29,
        "title": "Prohibited Content and Service Offerings",
        "p1": "Freelancers and businesses agree not to offer, promote, or engage in services or content that is illegal, harmful, discriminatory, or violates the platform’s policies, including but not limited to:",
        "p2": "Content that promotes violence, hate speech, or any form of discrimination.",
        "p3": "Illegal services, including but not limited to, activities that violate intellectual property laws, fraudulent schemes, or unlawful financial transactions.",
        "p4": "Offering or requesting services involving adult content, gambling, weapons, or anything considered inappropriate by the platform.",
        "p5": "Hire Arrive reserves the right to suspend or ban users who violate these policies without prior notice."
    },
    {
        "id": 30,
        "title": "Assignment of Rights",
        "p1": "Users may not assign, transfer, or delegate their rights or obligations under these terms without prior written consent from Hire Arrive.",
        "p2": "Hire Arrive may assign its rights and obligations to any third party in the event of a merger, acquisition, or sale of the company’s assets, or by operation of law."
    },
    {
        "id": 31,
        "title": "Changes to Services",
        "p1": "Hire Arrive reserves the right to modify, update, or discontinue any of its services, features, or pricing models at any time, at its sole discretion, without prior notice.",
        "p2": "Users agree that Hire Arrive will not be held liable for any changes or interruptions to services resulting from such modifications."
    },
    {
        "id": 32,
        "title": "User Behavior and Professionalism",
        "p1": "Freelancers and clients agree to maintain a professional standard of conduct while using the platform.",
        "p2": "All communications between users (freelancers, clients, and Hire Arrive personnel) should remain respectful, and users must avoid abusive language, harassment, or defamatory statements.",
        "p3": "Users who repeatedly violate professional standards or engage in abusive behavior may be permanently banned from the platform."
    },
    {
        "id": 33,
        "title": "Termination by User",
        "p1": "Users may request termination of their accounts at any time by contacting Hire Arrive’s support team.",
        "p2": "Upon termination, users will no longer have access to their accounts or any stored data unless otherwise specified in the termination process.",
        "p3": "Users are responsible for resolving any ongoing projects or payments before terminating their accounts. Any unsettled issues may prevent termination until resolved."
    },
    {
        "id": 34,
        "title": "Consequences of Account Termination",
        "p1": "Once an account is terminated, Hire Arrive will remove the user’s access to the platform. Freelancers and clients will no longer be able to view their profiles, ongoing projects, or previous engagements.",
        "p2": "Hire Arrive may retain certain user data for legal, tax, or compliance purposes, but this data will no longer be available to the user.",
        "p3": "Users are responsible for downloading and saving any personal data or records prior to termination."
    },
    {
        "id": 35,
        "title": "Breach of Terms",
        "p1": "If Hire Arrive believes that a user has violated any part of these Terms and Conditions, it may, without prior notice:",
        "p2": "Suspend or terminate the user’s access to the platform.",
        "p3": "Remove any content or materials posted by the user that violates the terms.",
        "p4": "Initiate legal action against the user to recover damages or seek equitable relief for the violation.",
        "p5": "Hire Arrive’s failure to act on a violation does not constitute a waiver of its right to act on similar or subsequent violations."
    },
    {
        "id": 36,
        "title": "Limitations of Liability",
        "p1": "In no event will Hire Arrive, its affiliates, officers, directors, employees, or agents be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to:",
        "p2": "Loss of profits, revenue, data, goodwill, or other intangible losses resulting from the use of, or inability to use, the platform.",
        "p3": "Any interruption or cessation of services.",
        "p4": "Unauthorized access to or alteration of user data.",
        "p5": "The total liability of Hire Arrive, whether in contract, tort, or otherwise, will not exceed the amount paid by the user for services rendered through the platform in the past six months."
    },
    {
        "id": 37,
        "title": "Governing Language",
        "p1": "In the event of any discrepancies between translated versions of these Terms and Conditions, the English version will prevail and govern."
    },
    {
        "id": 38,
        "title": "Force Majeure",
        "p1": "Hire Arrive shall not be liable for any failure or delay in performing its obligations under these Terms and Conditions due to events beyond its reasonable control, including but not limited to:",
        "p2": "Natural disasters (e.g., floods, earthquakes, hurricanes).",
        "p3": "Acts of war, terrorism, civil unrest, or government restrictions.",
        "p4": "Technical failures or interruptions of communication systems (e.g., internet outages, server failures).",
        "p5": "Users agree that Hire Arrive will not be held responsible for any damages, losses, or disruptions caused by such force majeure events."
    },
    {
        "id": 39,
        "title": "Feedback and Suggestions",
        "p1": "Users may provide suggestions, feedback, or other recommendations for improving the platform. By submitting feedback, users agree that Hire Arrive is free to use, modify, and implement these suggestions without any compensation or acknowledgment to the user.",
        "p2": "Feedback provided by users does not create any confidentiality obligation, and Hire Arrive is under no obligation to adopt or implement any user suggestions."
    },
    {
        "id": 40,
        "title": "Service Availability and Downtime",
        "p1": "While Hire Arrive strives to maintain continuous availability of the platform, users acknowledge that there may be occasional downtime due to maintenance, upgrades, or unforeseen technical issues.",
        "p2": "Hire Arrive is not liable for any loss of business, data, or revenue resulting from temporary interruptions to the service."
    },
    {
        "id": 41,
        "title": "Entire Agreement",
        "p1": "These Terms and Conditions, along with any additional policies or agreements referenced herein, constitute the entire agreement between users and Hire Arrive regarding the use of the platform.",
        "p2": "Any prior agreements, representations, or understandings between the parties, whether written or oral, are superseded by these Terms and Conditions."
    },
    {
        "id": 42,
        "title": "Freelancers’ Code of Conduct",
        "p1": "Freelancers must adhere to a professional code of conduct when offering services on the platform. This includes:",
        "p2": "Honesty and transparency in communicating availability, skills, and timelines.",
        "p3": "Delivering services in a timely and professional manner.",
        "p4": "Maintaining confidentiality with client information.",
        "p5": "Providing revisions or support as agreed upon in the service contract.",
        "p6": "Freelancers found to be in violation of this code of conduct may face account suspension or termination."
    },
    {
        "id": 43,
        "title": "Client Responsibilities",
        "p1": "Clients using the Hire Arrive platform are responsible for:",
        "p2": "Providing clear, detailed instructions and expectations to freelancers.",
        "p3": "Paying for services rendered promptly according to the agreed-upon terms.",
        "p4": "Providing feedback and addressing concerns with freelancers in a professional manner.",
        "p5": "Failure to fulfill client responsibilities may result in the suspension or termination of the client’s account."
    },
    {
        "id": 44,
        "title": "Feedback and Rating System",
        "p1": "Hire Arrive provides a feedback and rating system for clients and freelancers to review each other after the completion of projects. Users agree that all feedback and ratings will be honest, accurate, and based on genuine experiences.",
        "p2": "Users are prohibited from manipulating the rating system by providing false feedback, offering compensation in exchange for positive reviews, or otherwise attempting to alter their public reputation through deceitful means.",
        "p3": "Hire Arrive reserves the right to remove or moderate feedback that violates platform guidelines or is deemed inappropriate or defamatory."
    },
    {
        "id": 45,
        "title": "Independent Contractor Status",
        "p1": "Freelancers acknowledge that they are independent contractors and not employees, agents, or representatives of Hire Arrive. As independent contractors, freelancers are responsible for their own tax filings, insurance, and compliance with local labor laws.",
        "p2": "Hire Arrive is not responsible for providing health insurance, worker’s compensation, or other employee benefits to freelancers."
    },
    {
        "id": 46,
        "title": "Privacy and GDPR Compliance",
        "p1": "Hire Arrive is committed to protecting the privacy of its users and complying with all relevant data protection laws, including the General Data Protection Regulation (GDPR). The platform collects and processes user data as outlined in its Privacy Policy.",
        "p2": "Users located in the European Economic Area (EEA) have the right to request access, correction, deletion, or restriction of their personal data. Users can contact Hire Arrive’s support team to exercise their rights under GDPR."
    },
    {
        "id": 47,
        "title": "Reporting Misconduct and Fraud",
        "p1": "Users are encouraged to report any misconduct, fraud, or other suspicious activities encountered on the platform to Hire Arrive’s support team. Hire Arrive will investigate all reports in accordance with its policies.",
        "p2": "Users who knowingly file false reports or abuse the reporting system may face penalties, including account suspension or termination."
    },
    {
        "id": 48,
        "title": "Social Media and External Sharing",
        "p1": "Users may share their Hire Arrive profile or completed projects on external platforms (e.g., social media) to promote their services. However, users must ensure that such sharing does not violate any client confidentiality agreements or Hire Arrive’s platform policies.",
        "p2": "Hire Arrive reserves the right to monitor and take action on any external posts that misrepresent the platform, violate intellectual property rights, or damage Hire Arrive’s reputation."
    },
    {
        "id": 49,
        "title": "Freelancers’ Responsibility for Tools and Equipment",
        "p1": "Freelancers are responsible for providing their own tools, equipment, software, and resources necessary to perform their services. Hire Arrive is not responsible for any costs incurred by freelancers in the execution of their work.",
        "p2": "Freelancers agree to maintain their tools and equipment in good working condition to ensure the timely delivery of services."
    },
    {
        "id": 50,
        "title": "Prohibited Freelance Services",
        "p1": "Freelancers are prohibited from offering services that involve illegal activities, explicit adult content, or any services that violate local, national, or international laws. Examples of prohibited services include but are not limited to:",
        "p2": "Drug trafficking or the promotion of illegal substances.",
        "p3": "Fraudulent financial services or schemes.",
        "p4": "Copyright infringement, including the sale of pirated software or content.",
        "p5": "Hire Arrive reserves the right to immediately terminate any freelancer account engaged in such activities."
    },
    {
        "id": 51,
        "title": "Death of a Party",
        "p1": "In the event of the death of a user (either a freelancer or client), the rights and obligations of that user under these Terms and Conditions may be transferred to their legal heirs or estate, provided that the heirs or estate agree to be bound by these Terms and Conditions.",
        "p2": "Hire Arrive must be notified in writing of the user’s death, along with appropriate documentation to validate the claim, such as a death certificate or legal documents identifying the heirs or estate representatives.",
        "p3": "Upon receipt of such notification, Hire Arrive will assess the situation and determine how to handle any pending transactions, payments, or disputes involving the deceased user.",
        "p4": "Any outstanding payments due to the deceased user’s estate will be processed in accordance with the standard payment procedures, provided that all required documentation is submitted and verified by Hire Arrive.",
        "p5": "Hire Arrive is not responsible for any claims, disputes, or obligations arising after the death of a user unless formally notified and documented as outlined in this clause.",
        "p6": "Hire Arrive isn’t responsible for any loss or death, if a death of a person occurs either in the working hour or not.",
        "p7": "Hire Arrive acts as a service provider and all risk is yours."
    },

];


export default TermSheet


