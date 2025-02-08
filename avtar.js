const skills = [
            'github', 'git', 'html', 'css', 'js','sql', 'php', 
            'react', 'nodejs', 'vscode', 'cursor', 'python'
        ];

        function createSkillIcons() {
            const innerCircle = document.querySelector('.inner-circle');
            const outerCircle = document.querySelector('.outer-circle');
        
            const skillIcons = {
                'github': 'github-sign.png',
                'git': 'git.png',
                'html': 'html.png',
                'css': 'css-3.png',
                'js': 'js.png',
                'sql': 'sql-server.png',
                'php': 'php.png',
                'react': 'react.png',
                'nodejs': 'nodejs.png',
                'vscode': 'visual-studio.png',
                'cursor': 'click.png',
                'python': 'python.png'
            };
        
            skills.forEach((skill, index) => {
                // Inner circle icons
                const innerIcon = document.createElement('div');
                innerIcon.classList.add('skill-icon');
                innerIcon.style.backgroundImage = `url("${skillIcons[skill]}")`;
                
                const innerAngle = (index / skills.length) * Math.PI * 2;
                let innerRadius;
                let iconSize;
                
                // Function to update sizes based on window width
                const updateSizes = () => {
                    const homeContent = document.querySelector('.home-content');
                    
                    if (window.innerWidth <= 480) {
                        innerRadius = 75;
                        iconSize = 25;
                        innerCircle.style.width = '150px';
                        innerCircle.style.height = '150px';
                        if (homeContent) {
                            homeContent.style.width = '90%';
                            homeContent.style.padding = '10px';
                        }
                    } else if (window.innerWidth <= 768) {
                        innerRadius = 100;
                        iconSize = 30;
                        innerCircle.style.width = '200px';
                        innerCircle.style.height = '200px';
                        if (homeContent) {
                            homeContent.style.width = '80%';
                            homeContent.style.padding = '15px';
                        }
                    } else {
                        innerRadius = 150;
                        iconSize = 40;
                        innerCircle.style.width = '300px';
                        innerCircle.style.height = '300px';
                        if (homeContent) {
                            homeContent.style.width = '45%';
                            homeContent.style.padding = '20px';
                        }
                    }
                    
                    innerIcon.style.width = `${iconSize}px`;
                    innerIcon.style.height = `${iconSize}px`;
                    
                    const innerX = Math.cos(innerAngle) * innerRadius;
                    const innerY = Math.sin(innerAngle) * innerRadius;
                    innerIcon.style.left = `calc(50% + ${innerX}px - ${iconSize/2}px)`;
                    innerIcon.style.top = `calc(50% + ${innerY}px - ${iconSize/2}px)`;
                };
                
                // Initial size setup
                updateSizes();
                
                // Add resize listener for this icon
                window.addEventListener('resize', updateSizes);
                
                innerIcon.style.transformOrigin = 'center center';
                innerCircle.appendChild(innerIcon);
        
                // Outer circle icons
                const outerIcon = document.createElement('div');
                outerIcon.classList.add('skill-icon');
                outerIcon.style.backgroundImage = `url("${skillIcons[skill]}")`;
                
                const outerAngle = ((index / skills.length) * Math.PI * 2) - (Math.PI / 2);
                let outerRadius;
                
                // Function to update outer circle sizes
                const updateOuterSizes = () => {
                    if (window.innerWidth <= 480) {
                        outerRadius = 125;
                        outerCircle.style.width = '250px';
                        outerCircle.style.height = '250px';
                    } else if (window.innerWidth <= 768) {
                        outerRadius = 175;
                        outerCircle.style.width = '350px';
                        outerCircle.style.height = '350px';
                    } else {
                        outerRadius = 250;
                        outerCircle.style.width = '500px';
                        outerCircle.style.height = '500px';
                    }
                    
                    outerIcon.style.width = `${iconSize}px`;
                    outerIcon.style.height = `${iconSize}px`;
                    
                    const outerX = Math.cos(outerAngle) * outerRadius;
                    const outerY = Math.sin(outerAngle) * outerRadius;
                    outerIcon.style.left = `calc(50% + ${outerX}px - ${iconSize/2}px)`;
                    outerIcon.style.top = `calc(50% + ${outerY}px - ${iconSize/2}px)`;
                };
                
                // Initial outer size setup
                updateOuterSizes();
                
                // Add resize listener for outer icon
                window.addEventListener('resize', updateOuterSizes);
                
                outerIcon.style.transformOrigin = 'center center';
                outerCircle.appendChild(outerIcon);
            });
        }

        createSkillIcons();