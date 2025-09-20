document.addEventListener('DOMContentLoaded', function() {
    // Mode switching functionality
    const conceptMode = document.getElementById('concept-mode');
    const sqlMode = document.getElementById('sql-mode');
    const quizMode = document.getElementById('quiz-mode');
    
    const conceptArea = document.getElementById('concept-area');
    const sqlArea = document.getElementById('sql-area');
    const quizArea = document.getElementById('quiz-area');
    
    // Add click event listeners to mode cards
    conceptMode.querySelector('button').addEventListener('click', function() {
        showArea(conceptArea);
    });
    
    sqlMode.querySelector('button').addEventListener('click', function() {
        showArea(sqlArea);
    });
    
    quizMode.querySelector('button').addEventListener('click', function() {
        showArea(quizArea);
    });
    
    function showArea(area) {
        // Hide all areas
        conceptArea.classList.add('hidden');
        sqlArea.classList.add('hidden');
        quizArea.classList.add('hidden');
        
        // Show the selected area
        area.classList.remove('hidden');
        
        // Scroll to the area
        area.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Concept Explorer functionality
    const conceptButtons = document.querySelectorAll('.concept-btn');
    const conceptExplanation = document.querySelector('.concept-explanation');
    
    // Concept data
    const conceptData = {
        relational: {
            title: 'Relational Database Model',
            content: 'The relational model organizes data into tables with rows and columns. Each table represents an entity, and relationships between entities are established through foreign keys. This model, introduced by E.F. Codd in 1970, is the foundation for most modern database systems.'
        },
        normalization: {
            title: 'Database Normalization',
            content: 'Normalization is the process of organizing data to minimize redundancy and dependency by dividing large tables into smaller ones and defining relationships between them. The main goals are to eliminate redundant data and ensure data dependencies make sense. The process typically involves applying a series of rules (normal forms) to achieve a well-structured database.'
        },
        transactions: {
            title: 'Database Transactions',
            content: 'A transaction is a sequence of operations performed as a single logical unit of work. A transaction must exhibit ACID properties: Atomicity (all or nothing), Consistency (valid state to valid state), Isolation (concurrent transactions don\'t interfere), and Durability (committed changes are permanent).'
        },
        indexing: {
            title: 'Database Indexing',
            content: 'Indexing is a technique to optimize database performance by minimizing disk accesses required when a query is processed. It is a data structure that allows quick lookup of data in a column or columns of a table. Common types include B-tree, hash, and bitmap indexes.'
        }
    };
    
    // Add click event listeners to concept buttons
    conceptButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            conceptButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update concept content
            const concept = this.getAttribute('data-concept');
            updateConceptContent(concept);
            
            // Update visualization
            updateConceptVisualization(concept);
        });
    });
    
    function updateConceptContent(concept) {
        const data = conceptData[concept];
        conceptExplanation.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.content}</p>
        `;
    }
    
    // AI Assistant chat functionality for concepts
    const conceptQuestion = document.getElementById('concept-question');
    const conceptAsk = document.getElementById('concept-ask');
    const conceptChat = document.getElementById('concept-chat');
    
    conceptAsk.addEventListener('click', function() {
        const question = conceptQuestion.value.trim();
        if (question) {
            // Add user message
            addMessage(conceptChat, question, 'user');
            
            // Simulate AI response (in a real app, this would call an API)
            setTimeout(() => {
                const activeConcept = document.querySelector('.concept-btn.active').getAttribute('data-concept');
                const response = generateConceptResponse(question, activeConcept);
                addMessage(conceptChat, response, 'assistant');
            }, 1000);
            
            // Clear input
            conceptQuestion.value = '';
        }
    });
    
    // Allow pressing Enter to send message
    conceptQuestion.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            conceptAsk.click();
        }
    });
    
    function addMessage(chatElement, text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatElement.appendChild(messageDiv);
        
        // Scroll to bottom
        chatElement.scrollTop = chatElement.scrollHeight;
    }
    
    // SQL Playground functionality
    const sqlQuery = document.getElementById('sql-query');
    const runQuery = document.getElementById('run-query');
    const queryResults = document.getElementById('query-results');
    
    // Sample database for demo
    const sampleDatabase = {
        Students: [
            { student_id: 1, name: 'John Smith', email: 'john@example.com', major: 'Computer Science' },
            { student_id: 2, name: 'Emma Johnson', email: 'emma@example.com', major: 'Biology' },
            { student_id: 3, name: 'Michael Brown', email: 'michael@example.com', major: 'Mathematics' },
            { student_id: 4, name: 'Sophia Davis', email: 'sophia@example.com', major: 'Computer Science' }
        ],
        Courses: [
            { course_id: 101, title: 'Introduction to Databases', credits: 3, department: 'Computer Science' },
            { course_id: 102, title: 'Data Structures', credits: 4, department: 'Computer Science' },
            { course_id: 201, title: 'Molecular Biology', credits: 4, department: 'Biology' },
            { course_id: 301, title: 'Calculus I', credits: 4, department: 'Mathematics' }
        ],
        Enrollments: [
            { enrollment_id: 1001, student_id: 1, course_id: 101, semester: 'Fall 2023', grade: 'A' },
            { enrollment_id: 1002, student_id: 1, course_id: 102, semester: 'Fall 2023', grade: 'B+' },
            { enrollment_id: 1003, student_id: 2, course_id: 201, semester: 'Fall 2023', grade: 'A-' },
            { enrollment_id: 1004, student_id: 3, course_id: 301, semester: 'Fall 2023', grade: 'A' },
            { enrollment_id: 1005, student_id: 4, course_id: 101, semester: 'Fall 2023', grade: 'B' },
            { enrollment_id: 1006, student_id: 4, course_id: 102, semester: 'Fall 2023', grade: 'A-' }
        ]
    };
    
    runQuery.addEventListener('click', function() {
        const query = sqlQuery.value.trim();
        if (query) {
            // In a real app, this would send the query to a backend
            // Here we'll simulate some basic SQL parsing for demo purposes
            const result = simulateQueryExecution(query);
            displayQueryResults(result);
        }
    });
    
    // SQL Assistant functionality
    const sqlQuestion = document.getElementById('sql-question');
    const sqlAsk = document.getElementById('sql-ask');
    const sqlChat = document.getElementById('sql-chat');
    
    sqlAsk.addEventListener('click', function() {
        const question = sqlQuestion.value.trim();
        if (question) {
            // Add user message
            addMessage(sqlChat, question, 'user');
            
            // Simulate AI response
            setTimeout(() => {
                const response = generateSQLResponse(question, sqlQuery.value);
                addMessage(sqlChat, response, 'assistant');
            }, 1000);
            
            // Clear input
            sqlQuestion.value = '';
        }
    });
    
    // Allow pressing Enter to send message
    sqlQuestion.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sqlAsk.click();
        }
    });
    
    // Quiz functionality
    const quizData = [
        {
            question: 'What is the primary purpose of normalization in database design?',
            options: [
                'To increase data redundancy',
                'To minimize data redundancy and improve data integrity',
                'To combine multiple tables into a single table',
                'To eliminate the need for foreign keys'
            ],
            correctAnswer: 1,
            explanation: 'Normalization is a database design technique that reduces data redundancy and improves data integrity by organizing fields and tables in a database. It involves dividing large tables into smaller ones and defining relationships between them.'
        },
        {
            question: 'Which of the following is NOT one of the ACID properties of database transactions?',
            options: [
                'Atomicity',
                'Consistency',
                'Isolation',
                'Scalability'
            ],
            correctAnswer: 3,
            explanation: 'The ACID properties of database transactions are Atomicity, Consistency, Isolation, and Durability. Scalability is not one of the ACID properties.'
        },
        {
            question: 'What is a foreign key in a relational database?',
            options: [
                'A key that must be unique for each record in the table',
                'A field that uniquely identifies each record in a table',
                'A field that links to the primary key of another table',
                'A key that is used for encryption and decryption'
            ],
            correctAnswer: 2,
            explanation: 'A foreign key is a field (or collection of fields) in one table that refers to the primary key in another table. It is used to establish relationships between tables.'
        }
    ];
    
    let currentQuestionIndex = 0;
    const questionText = document.getElementById('question-text');
    const options = document.querySelectorAll('.option input');
    const optionLabels = document.querySelectorAll('.option label');
    const submitAnswer = document.getElementById('submit-answer');
    const nextQuestion = document.getElementById('next-question');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const progressFill = document.querySelector('.progress-fill');
    const quizFeedback = document.querySelector('.quiz-feedback');
    const answerExplanation = document.getElementById('answer-explanation');
    
    // Initialize quiz
    function initQuiz() {
        totalQuestionsSpan.textContent = quizData.length;
        loadQuestion(0);
    }
    
    function loadQuestion(index) {
        const question = quizData[index];
        questionText.textContent = question.question;
        
        // Update options
        options.forEach((option, i) => {
            option.checked = false;
            optionLabels[i].textContent = question.options[i];
        });
        
        // Update progress
        currentQuestionSpan.textContent = index + 1;
        progressFill.style.width = `${((index + 1) / quizData.length) * 100}%`;
        
        // Hide feedback
        quizFeedback.classList.add('hidden');
        
        // Disable next button until answer is submitted
        nextQuestion.disabled = true;
    }
    
    submitAnswer.addEventListener('click', function() {
        // Check if an option is selected
        const selectedOption = document.querySelector('.option input:checked');
        if (!selectedOption) {
            alert('Please select an answer');
            return;
        }
        
        const selectedAnswer = parseInt(selectedOption.value);
        const correctAnswer = quizData[currentQuestionIndex].correctAnswer;
        
        // Show feedback
        quizFeedback.classList.remove('hidden');
        answerExplanation.textContent = quizData[currentQuestionIndex].explanation;
        
        // Highlight correct and incorrect answers
        options.forEach((option, i) => {
            const optionDiv = option.closest('.option');
            if (i === correctAnswer) {
                optionDiv.style.backgroundColor = '#d1fae5'; // Light green
                optionDiv.style.borderColor = '#10b981'; // Green
            } else if (i === selectedAnswer && selectedAnswer !== correctAnswer) {
                optionDiv.style.backgroundColor = '#fee2e2'; // Light red
                optionDiv.style.borderColor = '#ef4444'; // Red
            }
        });
        
        // Enable next button
        nextQuestion.disabled = false;
    });
    
    nextQuestion.addEventListener('click', function() {
        // Reset option styles
        options.forEach(option => {
            const optionDiv = option.closest('.option');
            optionDiv.style.backgroundColor = '';
            optionDiv.style.borderColor = '';
        });
        
        // Move to next question or end quiz
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            // Quiz completed
            questionText.textContent = 'Quiz completed! Great job!';
            document.querySelector('.quiz-options').style.display = 'none';
            document.querySelector('.quiz-actions').style.display = 'none';
            quizFeedback.classList.add('hidden');
        }
    });
    
    // Initialize visualizations
    function initVisualizations() {
        updateConceptVisualization('relational');
    }
    
    // Initialize the application
    initQuiz();
    initVisualizations();
    
    // Helper functions for simulating AI responses
    function generateConceptResponse(question, concept) {
        // In a real app, this would call an AI API
        const responses = {
            relational: {
                'what is': 'The relational model is a database model based on first-order predicate logic, first described by Edgar F. Codd in 1969. It organizes data into tables (relations) with rows and columns, where each row represents a record and each column represents an attribute.',
                'example': 'A simple example of a relational database would be a "Students" table with columns for student_id, name, email, and major, and a "Courses" table with course_id, title, and department. These tables can be related through a third "Enrollments" table.',
                'advantage': 'The main advantages of the relational model include data independence, structural simplicity, ease of use, and the ability to create complex queries using SQL.',
                'disadvantage': 'Some disadvantages include performance limitations with very large datasets, complexity in handling hierarchical or network-like data structures, and impedance mismatch when working with object-oriented programming languages.'
            },
            normalization: {
                'what is': 'Normalization is the process of structuring a relational database to reduce data redundancy and improve data integrity. It involves organizing attributes and tables to minimize dependency and redundancy.',
                'example': 'For example, instead of having a single table with customer and order information, normalization would split this into a Customers table and an Orders table, with Orders referencing Customers via a foreign key.',
                'forms': 'The main normal forms are: 1NF (eliminates repeating groups), 2NF (eliminates partial dependencies), 3NF (eliminates transitive dependencies), BCNF (a stronger version of 3NF), and 4NF/5NF (dealing with multi-valued dependencies).',
                'when': 'You should normalize when you need to ensure data integrity, reduce redundancy, and make your database more flexible for future changes. However, sometimes denormalization is used for performance reasons.'
            },
            transactions: {
                'what is': 'A database transaction is a sequence of operations performed as a single logical unit of work. It must exhibit ACID properties to ensure reliability.',
                'acid': 'ACID stands for Atomicity (all operations complete successfully or none do), Consistency (the database remains in a valid state), Isolation (concurrent transactions don\'t interfere), and Durability (completed transactions persist).',
                'example': 'A classic example is a bank transfer: money must be both withdrawn from one account and deposited to another. If either operation fails, the entire transaction should be rolled back.',
                'isolation': 'Transaction isolation levels control how and when changes made by one transaction become visible to others. Common levels include Read Uncommitted, Read Committed, Repeatable Read, and Serializable, with increasing levels of isolation and overhead.'
            },
            indexing: {
                'what is': 'Database indexing is a technique to optimize the performance of database queries by minimizing disk accesses. An index is a data structure that provides quick lookup of data in a column or columns of a table.',
                'types': 'Common index types include B-tree (balanced tree, good for range queries), Hash (very fast exact lookups), Bitmap (efficient for low-cardinality columns), and Full-text (specialized for text searching).',
                'when': 'You should create indexes on columns that are frequently used in WHERE clauses, JOIN conditions, and ORDER BY clauses. However, indexes add overhead to write operations, so they should be used judiciously.',
                'trade': 'The main trade-off with indexing is between query speed and write performance. Indexes speed up SELECT queries but slow down INSERT, UPDATE, and DELETE operations because the indexes must be updated along with the data.'
            }
        };
        
        // Simple keyword matching
        const q = question.toLowerCase();
        const conceptResponses = responses[concept];
        
        for (const [keyword, response] of Object.entries(conceptResponses)) {
            if (q.includes(keyword)) {
                return response;
            }
        }
        
        // Default response if no keywords match
        return `I'm not sure about "${question}" in relation to ${conceptData[concept].title}. Could you rephrase your question or ask about a different aspect of this concept?`;
    }
    
    function generateSQLResponse(question, currentQuery) {
        // In a real app, this would call an AI API
        const q = question.toLowerCase();
        
        if (q.includes('join')) {
            return 'To join tables in SQL, you can use the JOIN keyword. For example: SELECT Students.name, Courses.title FROM Students JOIN Enrollments ON Students.student_id = Enrollments.student_id JOIN Courses ON Enrollments.course_id = Courses.course_id';
        } else if (q.includes('select') || q.includes('query')) {
            return 'A basic SELECT query has the form: SELECT column1, column2 FROM table_name WHERE condition ORDER BY column_name. For example: SELECT name, major FROM Students WHERE major = "Computer Science" ORDER BY name';
        } else if (q.includes('where')) {
            return 'The WHERE clause filters records. For example: SELECT * FROM Students WHERE major = "Computer Science"';
        } else if (q.includes('group by')) {
            return 'GROUP BY groups rows with the same values. For example: SELECT department, COUNT(*) FROM Courses GROUP BY department';
        } else if (q.includes('error') || q.includes('wrong')) {
            return 'Check your syntax for errors like missing semicolons, misspelled table/column names, or incorrect SQL keywords. Also ensure the tables you\'re querying actually exist in the database.';
        } else if (q.includes('optimize') || q.includes('performance')) {
            return 'To optimize SQL queries: 1) Use specific column names instead of SELECT *, 2) Add appropriate indexes, 3) Avoid unnecessary JOINs, 4) Use WHERE before GROUP BY, 5) Be careful with subqueries.';
        }
        
        // Default response
        return 'I can help with SQL syntax, optimization, or explaining results. Could you provide more details about what you need help with?';
    }
    
    function simulateQueryExecution(query) {
        // This is a very simplified SQL parser for demo purposes
        // In a real app, this would be handled by a proper SQL engine
        query = query.toLowerCase();
        
        try {
            if (query.includes('select') && query.includes('from')) {
                // Extract table name
                const fromMatch = query.match(/from\s+(\w+)/i);
                if (!fromMatch) return { error: 'Invalid FROM clause' };
                
                const tableName = fromMatch[1].charAt(0).toUpperCase() + fromMatch[1].slice(1);
                if (!sampleDatabase[tableName]) {
                    return { error: `Table '${tableName}' not found` };
                }
                
                let results = [...sampleDatabase[tableName]];
                
                // Handle WHERE clause
                if (query.includes('where')) {
                    const whereMatch = query.match(/where\s+(.*?)(?:order by|group by|$)/i);
                    if (whereMatch) {
                        const condition = whereMatch[1].trim();
                        
                        // Very basic condition parsing (only handles equals)
                        const conditionMatch = condition.match(/(\w+)\s*=\s*['"]?([^'"]+)['"]?/i);
                        if (conditionMatch) {
                            const [, field, value] = conditionMatch;
                            results = results.filter(row => String(row[field]).toLowerCase() === value.toLowerCase());
                        }
                    }
                }
                
                // Handle JOIN (very simplified)
                if (query.includes('join')) {
                    const joinMatch = query.match(/join\s+(\w+)/i);
                    if (joinMatch) {
                        const joinTable = joinMatch[1].charAt(0).toUpperCase() + joinMatch[1].slice(1);
                        if (!sampleDatabase[joinTable]) {
                            return { error: `Join table '${joinTable}' not found` };
                        }
                        
                        // Extract join condition
                        const onMatch = query.match(/on\s+([\w.]+)\s*=\s*([\w.]+)/i);
                        if (onMatch) {
                            const [, leftField, rightField] = onMatch;
                            const [leftTable, leftCol] = leftField.split('.');
                            const [rightTable, rightCol] = rightField.split('.');
                            
                            // Very simplified join logic
                            const joinedResults = [];
                            results.forEach(leftRow => {
                                sampleDatabase[joinTable].forEach(rightRow => {
                                    if (leftRow[leftCol] === rightRow[rightCol]) {
                                        joinedResults.push({ ...leftRow, ...rightRow });
                                    }
                                });
                            });
                            
                            results = joinedResults;
                        }
                    }
                }
                
                return { success: true, results };
            } else if (query.includes('insert into')) {
                return { success: true, message: 'Insert operation simulated. In a real database, a new record would be added.' };
            } else if (query.includes('update')) {
                return { success: true, message: 'Update operation simulated. In a real database, records would be modified.' };
            } else if (query.includes('delete from')) {
                return { success: true, message: 'Delete operation simulated. In a real database, records would be removed.' };
            } else {
                return { error: 'Unsupported SQL operation. Try a SELECT, INSERT, UPDATE, or DELETE statement.' };
            }
        } catch (error) {
            return { error: 'Error executing query: ' + error.message };
        }
    }
    
    function displayQueryResults(result) {
        if (result.error) {
            queryResults.innerHTML = `<p class="error">Error: ${result.error}</p>`;
            return;
        }
        
        if (result.message) {
            queryResults.innerHTML = `<p>${result.message}</p>`;
            return;
        }
        
        if (result.results && result.results.length > 0) {
            // Create table for results
            const table = document.createElement('table');
            table.className = 'results-table';
            
            // Create header row
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            
            Object.keys(result.results[0]).forEach(key => {
                const th = document.createElement('th');
                th.textContent = key;
                headerRow.appendChild(th);
            });
            
            thead.appendChild(headerRow);
            table.appendChild(thead);
            
            // Create body rows
            const tbody = document.createElement('tbody');
            
            result.results.forEach(row => {
                const tr = document.createElement('tr');
                
                Object.values(row).forEach(value => {
                    const td = document.createElement('td');
                    td.textContent = value;
                    tr.appendChild(td);
                });
                
                tbody.appendChild(tr);
            });
            
            table.appendChild(tbody);
            queryResults.innerHTML = '';
            queryResults.appendChild(table);
        } else {
            queryResults.innerHTML = '<p>No results found</p>';
        }
    }
    
    // Concept visualization using Chart.js
    function updateConceptVisualization(concept) {
        const canvas = document.getElementById('concept-canvas');
        const ctx = canvas.getContext('2d');
        
        // Clear previous chart if it exists
        if (window.conceptChart) {
            window.conceptChart.destroy();
        }
        
        // Create different visualizations based on the concept
        switch (concept) {
            case 'relational':
                createRelationalModelVisualization(ctx);
                break;
            case 'normalization':
                createNormalizationVisualization(ctx);
                break;
            case 'transactions':
                createTransactionsVisualization(ctx);
                break;
            case 'indexing':
                createIndexingVisualization(ctx);
                break;
        }
    }
    
    function createRelationalModelVisualization(ctx) {
        // Simple visualization showing tables and relationships
        window.conceptChart = new Chart(ctx, {
            type: 'bubble',
            data: {
                datasets: [{
                    label: 'Students',
                    data: [{x: 100, y: 100, r: 40}],
                    backgroundColor: 'rgba(67, 97, 238, 0.6)'
                }, {
                    label: 'Courses',
                    data: [{x: 300, y: 100, r: 40}],
                    backgroundColor: 'rgba(72, 149, 239, 0.6)'
                }, {
                    label: 'Enrollments',
                    data: [{x: 200, y: 250, r: 40}],
                    backgroundColor: 'rgba(76, 201, 240, 0.6)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        min: 0,
                        max: 400,
                        grid: {
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    },
                    y: {
                        min: 0,
                        max: 350,
                        grid: {
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label;
                                if (label === 'Students') {
                                    return ['Students Table:', 'student_id (PK)', 'name', 'email', 'major'];
                                } else if (label === 'Courses') {
                                    return ['Courses Table:', 'course_id (PK)', 'title', 'credits', 'department'];
                                } else if (label === 'Enrollments') {
                                    return ['Enrollments Table:', 'enrollment_id (PK)', 'student_id (FK)', 'course_id (FK)', 'semester', 'grade'];
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    
    function createNormalizationVisualization(ctx) {
        // Visualization showing normalization process
        window.conceptChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1NF', '2NF', '3NF', 'BCNF', '4NF', '5NF'],
                datasets: [{
                    label: 'Data Redundancy',
                    data: [100, 70, 40, 25, 15, 10],
                    backgroundColor: 'rgba(247, 37, 133, 0.6)',
                    borderColor: 'rgba(247, 37, 133, 1)',
                    borderWidth: 1
                }, {
                    label: 'Data Integrity',
                    data: [20, 40, 65, 80, 90, 95],
                    backgroundColor: 'rgba(76, 201, 240, 0.6)',
                    borderColor: 'rgba(76, 201, 240, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Percentage'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label;
                                const value = context.raw;
                                return `${label}: ${value}%`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    function createTransactionsVisualization(ctx) {
        // Visualization showing ACID properties
        window.conceptChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
                datasets: [{
                    label: 'ACID Properties',
                    data: [90, 85, 80, 95],
                    backgroundColor: 'rgba(63, 55, 201, 0.4)',
                    borderColor: 'rgba(63, 55, 201, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(63, 55, 201, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(63, 55, 201, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label;
                                const value = context.raw;
                                const descriptions = {
                                    'Atomicity': 'All operations complete successfully or none do',
                                    'Consistency': 'The database remains in a valid state',
                                    'Isolation': 'Concurrent transactions don\'t interfere',
                                    'Durability': 'Completed transactions persist'
                                };
                                return [`${label}: ${value}%`, descriptions[label]];
                            }
                        }
                    }
                }
            }
        });
    }
    
    function createIndexingVisualization(ctx) {
        // Visualization comparing index types
        window.conceptChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['B-tree', 'Hash', 'Bitmap', 'Full-text'],
                datasets: [{
                    label: 'Read Performance',
                    data: [80, 95, 70, 60],
                    backgroundColor: 'rgba(76, 201, 240, 0.6)',
                    borderColor: 'rgba(76, 201, 240, 1)',
                    borderWidth: 1
                }, {
                    label: 'Write Performance',
                    data: [70, 75, 60, 50],
                    backgroundColor: 'rgba(247, 37, 133, 0.6)',
                    borderColor: 'rgba(247, 37, 133, 1)',
                    borderWidth: 1
                }, {
                    label: 'Range Query Support',
                    data: [90, 30, 60, 70],
                    backgroundColor: 'rgba(63, 55, 201, 0.6)',
                    borderColor: 'rgba(63, 55, 201, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Performance Score'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }
});