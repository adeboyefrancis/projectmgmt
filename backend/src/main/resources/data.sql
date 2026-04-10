-- Users (matching dummyUsers from assets.js)
INSERT INTO users (id, name, email, image, created_at, updated_at) VALUES
('user_1', 'Alex Smith',   'alexsmith@example.com',  '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user_2', 'John Warrel',  'johnwarrel@example.com',  '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user_3', 'Oliver Watts', 'oliverwatts@example.com', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user_4', 'James Watts', 'jameswatts@example.com', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Workspaces
INSERT INTO workspaces (id, name, slug, description, owner_id, image_url, created_at, updated_at) VALUES
('org_1', 'Corp Workspace', 'corp-workspace', null, 'user_3', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('org_2', 'Cloud Ops Hub',  'cloud-ops-hub',  null, 'user_3', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Workspace Members (org_1)
INSERT INTO workspace_members (id, user_id, workspace_id, message, role) VALUES
('a7422a50-7dfb-4e34-989c-881481250f0e', 'user_1', 'org_1', '', 'ADMIN'),
('b325ed10-00d8-4e22-b94d-33a9994fd06b', 'user_2', 'org_1', '', 'ADMIN'),
('0f786ac0-62f7-493f-a5a0-787fd7c9c8b3', 'user_3', 'org_1', '', 'ADMIN');

-- Workspace Members (org_2)
INSERT INTO workspace_members (id, user_id, workspace_id, message, role) VALUES
('f5d37afc-c287-4bd8-a607-b50d20837234', 'user_3', 'org_2', '', 'ADMIN'),
('f5c04fe5-a0f5-4d34-bcf6-ea54dce1b546', 'user_1', 'org_2', '', 'ADMIN'),
('9b29463a-e828-4d4e-9d64-8e57a3ad1a90', 'user_2', 'org_2', '', 'ADMIN');

-- Projects (org_1)
INSERT INTO projects (id, name, description, priority, status, start_date, end_date, team_lead, workspace_id, progress, created_at, updated_at) VALUES
('4d0f6ef3-e798-4d65-a864-00d9f8085c51', 'LaunchPad CRM',
 'A next-gen CRM for startups to manage customer pipelines, analytics, and automation.',
 'HIGH', 'ACTIVE', '2025-10-10', '2026-02-28', 'user_3', 'org_1', 65, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('a1b2c3d4-0001-0001-0001-000000000001', 'Mobile App Redesign',
 'Full UX/UI overhaul of the iOS and Android apps.',
 'MEDIUM', 'PLANNING', '2025-11-01', '2026-03-01', 'user_1', 'org_1', 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Projects (org_2)
INSERT INTO projects (id, name, description, priority, status, start_date, end_date, team_lead, workspace_id, progress, created_at, updated_at) VALUES
('c45e93ec-2f68-4f07-af4b-aa84f1bd407c', 'Kubernetes Migration',
 'Migrate the monolithic app infrastructure to Kubernetes for scalability.',
 'HIGH', 'ACTIVE', '2025-10-15', '2026-01-20', 'user_3', 'org_2', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('b190343f-a7b1-4a40-b483-ecc59835cba3', 'Automated Regression Suite',
 'Selenium + Playwright hybrid test framework for regression testing.',
 'MEDIUM', 'ACTIVE', '2025-10-03', '2025-10-15', 'user_3', 'org_2', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Project Members
INSERT INTO project_members (id, user_id, project_id) VALUES
('17dc3764-737f-4584-9b54-d1a3b401527d', 'user_1', '4d0f6ef3-e798-4d65-a864-00d9f8085c51'),
('17dc3764-737f-4584-9b54-d1a3b401527e', 'user_2', '4d0f6ef3-e798-4d65-a864-00d9f8085c51'),
('17dc3764-737f-4584-9b54-d1a3b401527f', 'user_3', '4d0f6ef3-e798-4d65-a864-00d9f8085c51'),
('17dc3764-0001-0001-0001-000000000001', 'user_1', 'a1b2c3d4-0001-0001-0001-000000000001'),
('511552d5-eddd-4b12-a60d-fad0821682a7', 'user_3', 'c45e93ec-2f68-4f07-af4b-aa84f1bd407c'),
('79c364eb-eca5-4056-bea9-46c2f54efe4c', 'user_1', 'c45e93ec-2f68-4f07-af4b-aa84f1bd407c'),
('5fcbda36-d327-4615-bb38-d871a014fe52', 'user_2', 'c45e93ec-2f68-4f07-af4b-aa84f1bd407c'),
('1a0d5a66-c2ca-4294-9735-f3bd287500fa', 'user_3', 'b190343f-a7b1-4a40-b483-ecc59835cba3'),
('5ea89fe0-64b5-4737-a379-a9d89790ea3a', 'user_1', 'b190343f-a7b1-4a40-b483-ecc59835cba3'),
('320b617a-165e-42ec-8065-05da2d10b622', 'user_2', 'b190343f-a7b1-4a40-b483-ecc59835cba3');

-- Tasks (LaunchPad CRM)
INSERT INTO tasks (id, project_id, title, description, status, type, priority, assignee_id, due_date, created_at, updated_at) VALUES
('24ca6d74-7d32-41db-a257-906a90bca8f4', '4d0f6ef3-e798-4d65-a864-00d9f8085c51',
 'Design Dashboard UI', 'Create a modern, responsive CRM dashboard layout.',
 'IN_PROGRESS', 'FEATURE', 'HIGH', 'user_1', '2025-10-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('9dbd5f04-5a29-4232-9e8c-a1d8e4c566df', '4d0f6ef3-e798-4d65-a864-00d9f8085c51',
 'Integrate Email API', 'Set up SendGrid integration for email campaigns.',
 'TODO', 'TASK', 'MEDIUM', 'user_2', '2025-11-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('0e6798ad-8a1d-4bca-b0cd-8199491dbf03', '4d0f6ef3-e798-4d65-a864-00d9f8085c51',
 'Fix Duplicate Contact Bug', 'Duplicate records appear when importing CSV files.',
 'TODO', 'BUG', 'HIGH', 'user_1', '2025-12-05', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('7989b4cc-1234-4816-a1d9-cc86cd09596a', '4d0f6ef3-e798-4d65-a864-00d9f8085c51',
 'Add Role-Based Access Control', 'Define user roles and permissions for the dashboard.',
 'IN_PROGRESS', 'IMPROVEMENT', 'MEDIUM', 'user_2', '2025-12-20', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Tasks (Kubernetes Migration)
INSERT INTO tasks (id, project_id, title, description, status, type, priority, assignee_id, due_date, created_at, updated_at) VALUES
('fc8ac710-ad12-4508-b934-9d59dea01872', 'c45e93ec-2f68-4f07-af4b-aa84f1bd407c',
 'Security Audit', 'Run container vulnerability scans and review IAM roles.',
 'TODO', 'OTHER', 'MEDIUM', 'user_3', '2025-12-10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('1cd6f85d-889a-4a5b-901f-ed8fa221d62b', 'c45e93ec-2f68-4f07-af4b-aa84f1bd407c',
 'Set Up EKS Cluster', 'Provision EKS cluster on AWS and configure nodes.',
 'TODO', 'TASK', 'HIGH', 'user_1', '2025-12-15', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('8125eeac-196d-4797-8b14-21260f46abcc', 'c45e93ec-2f68-4f07-af4b-aa84f1bd407c',
 'Implement CI/CD with GitHub Actions', 'Add build, test, and deploy steps using GitHub Actions.',
 'TODO', 'TASK', 'MEDIUM', 'user_2', '2025-10-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Tasks (Automated Regression Suite)
INSERT INTO tasks (id, project_id, title, description, status, type, priority, assignee_id, due_date, created_at, updated_at) VALUES
('8836edf0-b4d7-4eec-a170-960d715a0b7f', 'b190343f-a7b1-4a40-b483-ecc59835cba3',
 'Migrate to Playwright 1.48', 'Update scripts to use latest Playwright features.',
 'IN_PROGRESS', 'IMPROVEMENT', 'HIGH', 'user_1', '2025-10-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('ce3dc378-f959-42f4-b12b-4c6cae6195c9', 'b190343f-a7b1-4a40-b483-ecc59835cba3',
 'Parallel Test Execution', 'Enable concurrent test runs across CI pipelines.',
 'TODO', 'TASK', 'MEDIUM', 'user_2', '2025-11-28', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('e01fda50-8818-4635-bcb6-9cde5c140b3d', 'b190343f-a7b1-4a40-b483-ecc59835cba3',
 'Visual Snapshot Comparison', 'Implement screenshot diffing for UI regression detection.',
 'TODO', 'FEATURE', 'LOW', 'user_1', '2025-11-20', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
