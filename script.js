
        function calculateWorkload() {
            // Function to safely parse numbers, returns 0 for invalid inputs
            function parseInput(value) {
                return isNaN(parseFloat(value)) ? 0 : parseFloat(value);
            }
            // Reading Section
            var surveyReading = parseInput(document.getElementById("surveyReading").value);
            var surveyReadingRate = parseInput(document.getElementById("surveyReadingRate").value);
            var totalHoursSurveyReading = surveyReading / surveyReadingRate;
            var understandReading = parseInput(document.getElementById("understandReading").value);
            var understandReadingRate = parseInput(document.getElementById("understandReadingRate").value);
            var totalHoursUnderstandReading = understandReading / understandReadingRate;
            var engageReading = parseInput(document.getElementById("engageReading").value);
            var engageReadingRate = parseInput(document.getElementById("engageReadingRate").value);
            var totalHoursEngageReading = engageReading / engageReadingRate;
            // Writing Section
            var reflectiveWriting = parseInput(document.getElementById("reflectiveWriting").value);
            var totalHoursReflectiveWriting = reflectiveWriting * 1; // 1 hour per page
            var argumentWriting = parseInput(document.getElementById("argumentWriting").value);
            var totalHoursArgumentWriting = argumentWriting * 2; // 2 hours per page
            var researchWriting = parseInput(document.getElementById("researchWriting").value);
            var totalHoursResearchWriting = researchWriting * 4; // 4 hours per page
            // Other Sections
            var examPreparation = parseInput(document.getElementById("examPreparation").value);
            var lectures = parseInput(document.getElementById("lectures").value);
            var independentWork = parseInput(document.getElementById("independentWork").value);
            var homeExercises = parseInput(document.getElementById("homeExercises").value);
            var groupWorkHours = parseInput(document.getElementById("groupWorkHours").value);
            var otherWorkHours = parseInput(document.getElementById("otherWorkHours").value);
            // Sum up all hours
            var totalHours = totalHoursSurveyReading + totalHoursUnderstandReading + totalHoursEngageReading + totalHoursReflectiveWriting + totalHoursArgumentWriting + totalHoursResearchWriting + examPreparation + lectures + independentWork + homeExercises + groupWorkHours + otherWorkHours;
            // Update the Total Hours and ECTS (assuming 1 ECTS = 27 hours)
            document.getElementById("totalHours").innerHTML = totalHours.toFixed(2);
            document.getElementById("ectsCredits").innerHTML = (totalHours / 27).toFixed(2);
        }
        // Update slider values dynamically
        document.getElementById("surveyReadingRate").oninput = function() {
            document.getElementById("surveyReadingRateValue").innerHTML = this.value;
        };
        document.getElementById("engageReadingRate").oninput = function() {
            document.getElementById("engageReadingRateValue").innerHTML = this.value;
        };
        document.getElementById("understandReadingRate").oninput = function() {
            document.getElementById("understandReadingRateValue").innerHTML = this.value;
        }

        function resetForm() {
            // Reset all input type="number" fields
            var numberInputs = document.querySelectorAll('input[type="number"]');
            numberInputs.forEach(function(input) {
                input.value = '';
            });
            // Reset all input type="range" fields to their default values
            document.getElementById("surveyReadingRate").value = 35;
            document.getElementById("surveyReadingRateValue").innerHTML = '35';
            document.getElementById("understandReadingRate").value = 15;
            document.getElementById("understandReadingRateValue").innerHTML = '15';
            document.getElementById("engageReadingRate").value = 7;
            document.getElementById("engageReadingRateValue").innerHTML = '7';
            // Update results to zero
            document.getElementById("totalHours").innerHTML = '0';
            document.getElementById("ectsCredits").innerHTML = '0';
        }

        function printResults() {
            var printableContent = '<h2>Course Workload Calculator Results</h2>';
            // Function to add input values and calculated hours to printable content
            function addInputValueToPrintableContent(inputId, rateId, description, isReading, fixedRate) {
                var value = parseFloat(document.getElementById(inputId).value);
                var rate = rateId ? parseFloat(document.getElementById(rateId).value) : null;
                var hours;
                if (value > 0) {
                    if (isReading) {
                        hours = rate ? (value / rate).toFixed(2) : value; // For reading, divide pages by rate
                    } else if (fixedRate) {
                        hours = (value * fixedRate).toFixed(2); // For fixed rate writing, multiply pages by fixed rate
                    } else {
                        hours = value; // For other activities, use the value directly
                    }
                    if (isReading || fixedRate) {
                        printableContent += '<p><strong>' + description + ':</strong> ' + value + ' pages (= ' + hours + ' hours)</p>';
                    } else {
                        printableContent += '<p><strong>' + description + ':</strong> ' + value + ' hours</p>';
                    }
                }
            }
            // Add input values
            addInputValueToPrintableContent("surveyReading", "surveyReadingRate", "Survey Reading", true, null);
            addInputValueToPrintableContent("understandReading", "understandReadingRate", "Understand Reading", true, null);
            addInputValueToPrintableContent("engageReading", "engageReadingRate", "Engage Reading", true, null);
            addInputValueToPrintableContent("reflectiveWriting", null, "Reflective Writing", false, 1);
            addInputValueToPrintableContent("argumentWriting", null, "Argument Writing", false, 2);
            addInputValueToPrintableContent("researchWriting", null, "Research Writing", false, 4);
            addInputValueToPrintableContent("examPreparation", null, "Exam Preparation", false, null);
            addInputValueToPrintableContent("lectures", null, "Lectures", false, null);
            addInputValueToPrintableContent("independentWork", null, "Independent Work", false, null);
            addInputValueToPrintableContent("homeExercises", null, "Home Exercises", false, null);
            addInputValueToPrintableContent("groupWorkHours", null, "Group Work", false, null);
            addInputValueToPrintableContent("otherWorkHours", null, "Other Work", false, null);
            // Add total hours and ECTS
            var totalHours = document.getElementById("totalHours").innerHTML;
            var ectsCredits = document.getElementById("ectsCredits").innerHTML;
            printableContent += '<p><strong>Total Hours:</strong> ' + totalHours + '</p>';
            printableContent += '<p><strong>ECTS Credits:</strong> ' + ectsCredits + '</p>';
            // Open a new tab and write the printable content along with a print button
            var resultTab = window.open('', '_blank');
            resultTab.document.write('<html><head><title>Print Results</title><style>');
            // Custom CSS styles for the print page
            resultTab.document.write('body { font-family: Arial, sans-serif; margin: 20px; background-color: white; }');
            resultTab.document.write('h2 { color: #4CAF50; margin-bottom: 10px; }');
            resultTab.document.write('p { font-size: 14px; margin: 5px 0; }');
            resultTab.document.write('strong { color: #333; font-weight: normal; }');
            resultTab.document.write('</style></head><body>');
            resultTab.document.write(printableContent);
            resultTab.document.write('<button onclick="window.print()">Print this page</button>');
            resultTab.document.write('</body></html>');
            resultTab.document.close();
        }