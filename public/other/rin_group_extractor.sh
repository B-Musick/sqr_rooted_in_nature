#!/bin/bash

# pdftotext on linux to turn the pdf to text
# brew install poppler on mac

echo -n "What filename do you want to use?"
read FILENAME # Save input to variable FILENAME
FILE=$PWD/$FILENAME # Full path name
touch "key_$FILENAME" # Create file to put the key into
OUTPUT_FILE="key_$FILENAME"
#MULTILINE=false; # Holds whether need to access multiple lines
#CURRENT_NUMBER = 1; # Holds the current dichotomous sentence group number

echo $'{\n\tkey:{' > $OUTPUT_FILE
echo $OUTPUT_FILE

## Take the word results and place them in an array 
declare -a RESULTS_ARRAY

############# LOOP THROUGH LINES OF THE TEXT FILE ############

while read p; do    
    NUMBER=''
    LETTER=''
    SENTENCE=''
    if [[ $p =~ ^[0-9][0-9][a-b] ]]; then
        ### If line starts with a number, then it is one of the test lines

        line_number_letter=${BASH_REMATCH[0]} # https://unix.stackexchange.com/questions/63690/extracting-a-string-according-to-a-pattern-in-a-bash-script
        NUMBER=`echo "$line_number_letter" | cut -c -2` # Extract the number
 	    LETTER=`echo "$line_number_letter" | cut -c 3` # Extract third character (letter)
	    
        ## Removes the number at start and everything at end to get the sentence
        # Can either have a space between at the result or be right next to the period
        SENTENCE=`echo "$p" | cut -c 5- | sed -E 's/ *(\.[[:space:]])*\.[[:space:]]?([A-Za-z0-9]*)//g' ` 

        if [ $LETTER == "b" ]; then
            # If letter 'b' then close the object arrays
            if [[ $p =~ [0-9][0-9]$ ]]; then
                # If reach the dots then cut out the text and stop multiline grab
                # MULTILINE=false;    
                result=`echo ${BASH_REMATCH[0]}` # Holds the result object key
                # echo $multiline
                printf '\n\t\t\t"%s" : {\n\t\t\t\tsentence : "%s",\n\t\t\t\tresult : "%s"\n\t\t\t\t}\n\t\t\t},\n' "$LETTER" "$SENTENCE" "$result" >> $OUTPUT_FILE

            elif [[ $p =~ [A-Za-z]*([[:space:]][[:alpha:]]*)?$  ]]; then
                result=`echo ${BASH_REMATCH[0]}` # Holds the result object key
                RESULTS_ARRAY+='"'$result'", ' # Add string to array
               
                # https://unix.stackexchange.com/questions/20035/how-to-add-newlines-into-variables-in-bash-script
                # https://askubuntu.com/questions/772057/variable-expansion-in-single-quote
                printf '\n\t\t\t"%s" : {\n\t\t\t\tsentence : "%s",\n\t\t\t\tresult : "%s"\n\t\t\t\t\t}\n\t\t\t},\n' "$LETTER" "$SENTENCE" "$result" >> $OUTPUT_FILE
            fi
        else
            # If letter is 'a' then start the object and add put the number outside and start the object for the letters
            if [[ $p =~ [0-9][0-9]$ ]]; then
                # If the end is an integer 
                # MULTILINE=false;    
                result=`echo ${BASH_REMATCH[0]}` # Holds the result object key
                # echo $multiline
                printf '\t\t"%s" : {\n\t\t\t"%s" : {\n\t\t\t\tsentence : "%s",\n\t\t\t\tresult : "%s"\n\t\t\t\t},' "$NUMBER" "$LETTER" "$SENTENCE" "$result" >> $OUTPUT_FILE

            elif [[ $p =~ [A-Za-z]*([[:space:]][[:alpha:]]*)?$  ]]; then
                # if the result is a word 
                result=`echo ${BASH_REMATCH[0]}` # Holds the result object key
                RESULTS_ARRAY+='"'$result'", '

                
                # https://unix.stackexchange.com/questions/20035/how-to-add-newlines-into-variables-in-bash-script
                # https://askubuntu.com/questions/772057/variable-expansion-in-single-quote
                printf '\t\t"%s" : {\n\t\t\t"%s" : {\n\t\t\t\tsentence : "%s",\n\t\t\t\tresult : "%s"\n\t\t\t\t},' "$NUMBER" "$LETTER" "$SENTENCE" "$result" >> $OUTPUT_FILE
            fi
        fi

    fi
done < $FILE 

echo $RESULTS_ARRAY
echo $indexCount
echo $'\t\t}\n\t}\n}' >> $OUTPUT_FILE
echo $'\n\nlet families = ['${RESULTS_ARRAY[*]}']' >> $OUTPUT_FILE




# while read p; read q; do    
#     NUMBER=''
#     LETTER=''
#     SENTENCE=''
#     if [[ $p =~ ^[0-9][0-9][a-b] ]]; then
#         ### If line starts with a number, then it is one of the test lines

#         line_number_letter=${BASH_REMATCH[0]} # https://unix.stackexchange.com/questions/63690/extracting-a-string-according-to-a-pattern-in-a-bash-script
#         NUMBER=`echo "$line_number_letter" | cut -c -2` # Extract the number
#  	    LETTER=`echo "$line_number_letter" | cut -c 3` # Extract third character (letter)
	    
#         ## Removes the number at start and everything at end to get the sentence
#         # Can either have a space between at the result or be right next to the period
#         SENTENCE=`echo "$p" | cut -c 5- | sed -E 's/ *(\.[[:space:]])*\.[[:space:]]?([A-Za-z0-9]*)//g' ` 

#         if [ $LETTER == "b" ]; then
#             # If letter 'b' then close the object arrays
#             if [[ $p =~ [0-9][0-9]$ ]]; then
#                 # If reach the dots then cut out the text and stop multiline grab
#                 # MULTILINE=false;    
#                 result=`echo ${BASH_REMATCH[0]}` # Holds the result object key
#                 # echo $multiline
#                 printf '\n\t\t\t"%s" : {\n\t\t\t\tsentence : "%s",\n\t\t\t\tresult : "%s"\n\t\t\t\t}\n\t\t\t},\n' "$LETTER" "$SENTENCE" "$result" >> $OUTPUT_FILE

#             elif [[ $p =~ [A-Za-z]*([[:space:]][[:alpha:]]*)?$  ]]; then
#                 result=`echo ${BASH_REMATCH[0]}` # Holds the result object key
#                 RESULTS_ARRAY+='"'$result'", ' # Add string to array
               
#                 # https://unix.stackexchange.com/questions/20035/how-to-add-newlines-into-variables-in-bash-script
#                 # https://askubuntu.com/questions/772057/variable-expansion-in-single-quote
#                 printf '\n\t\t\t"%s" : {\n\t\t\t\tsentence : "%s",\n\t\t\t\tresult : "%s"\n\t\t\t\t\t}\n\t\t\t},\n' "$LETTER" "$SENTENCE" "$result" >> $OUTPUT_FILE
#             fi
#         else
#             # If letter is 'a' then start the object and add put the number outside and start the object for the letters
#             if [[ $p =~ [0-9][0-9]$ ]]; then
#                 # If the end is an integer 
#                 # MULTILINE=false;    
#                 result=`echo ${BASH_REMATCH[0]}` # Holds the result object key
#                 # echo $multiline
#                 printf '\t\t"%s" : {\n\t\t\t"%s" : {\n\t\t\t\tsentence : "%s",\n\t\t\t\tresult : "%s"\n\t\t\t\t},' "$NUMBER" "$LETTER" "$SENTENCE" "$result" >> $OUTPUT_FILE

#             elif [[ $p =~ [A-Za-z]*([[:space:]][[:alpha:]]*)?$  ]]; then
#                 # if the result is a word 
#                 result=`echo ${BASH_REMATCH[0]}` # Holds the result object key
#                 RESULTS_ARRAY+='"'$result'", '

                
#                 # https://unix.stackexchange.com/questions/20035/how-to-add-newlines-into-variables-in-bash-script
#                 # https://askubuntu.com/questions/772057/variable-expansion-in-single-quote
#                 printf '\t\t"%s" : {\n\t\t\t"%s" : {\n\t\t\t\tsentence : "%s",\n\t\t\t\tresult : "%s"\n\t\t\t\t},' "$NUMBER" "$LETTER" "$SENTENCE" "$result" >> $OUTPUT_FILE
#             fi
#         fi

#     fi
# done < $FILE 

# echo $RESULTS_ARRAY
# echo $indexCount
# echo $'\t\t}\n\t}\n}' >> $OUTPUT_FILE
# echo $'\n\nlet families = ['${RESULTS_ARRAY[*]}']' >> $OUTPUT_FILE%