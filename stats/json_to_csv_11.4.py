import json
import csv

# comment this out and write your own file path if applicable
file = "emotional-clarity-export.json"


# This function creates a csv file of the responses of all users
# from the JSON file.
def json_to_csv(file_name):
    pid_and_info = {}
    colnames = ['pid']
    with open(file_name, encoding='utf-8') as f:
        data = json.load(f)
        for breakup in data['app-responses'].values():
            for pid in breakup.keys():
                pid_and_info[pid] = []
                for category in breakup[pid]:
                    for question in breakup[pid][category]:
                        if question not in colnames:
                            colnames.append(question)
                        answer = breakup[pid][category][question]
                        pid_and_info[pid].append(
                            [question, answer])

    # create a csv and put keys and labels there
    with open('user_answers.csv', 'w', newline='') as f:
        write = csv.writer(f)
        write.writerow(colnames)

        # make a list that will be the next row,
        # with 1 as complete and 0 as not
        for pid in pid_and_info.keys():
            row = [0] * (len(colnames))
            row.insert(0, pid)
            print(pid)
            print(row)
            # get label
            info = pid_and_info[pid]
            print(type(info))

            for question_answer in info:
                # get index of question
                index = colnames.index(question_answer[0])
                row[index] = question_answer[1]

            write.writerow(row)


json_to_csv(file)
