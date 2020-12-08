import json
import csv


def appCompleteDataToCSV(file_name):
    # create a dictionary with pid as keys and labels
    # that might have the word 'after' as values
    pid_and_label = {}
    with open(file_name, encoding='utf-8') as f:
        data = json.load(f)
        firstKeys = data['app-variant'].keys()
        for key_1 in firstKeys:
            # the pid
            secondKeys = data['app-variant'][key_1].keys()
            for pid_rough in secondKeys:
                pid = pid_rough[3:]
                pid_and_label[pid] = []
                # the string with after
                thirdKeys = data['app-variant'][key_1][pid_rough].keys()
                for label in thirdKeys:
                    pid_and_label[pid].append(label)

    # create a dict of full labels as keys and proper labels
    # (for column names) as values
    labels_csv = {}
    for labels in pid_and_label.values():
        for label_rough in labels:
            if 'complete' in label_rough:
                # print(label)
                label = label_rough[len('complete-'):]
                labels_csv[label_rough] = label

    # quickly create a nice list of column names
    colnames = ['pid']
    for label in labels_csv.values():
        colnames.append(label)

    # create a csv and put keys and labels there
    with open('pid_and_complete_label.csv', 'w', newline='') as f:
        write = csv.writer(f)
        write.writerow(colnames)

        # make a list that will be the next row,
        # with 1 as complete and 0 as not
        for pid in pid_and_label.keys():
            row = [0] * (len(colnames) - 1)
            row.insert(0, pid)
            # get label
            labels = pid_and_label[pid]
            for label_rough in labels:
                # if label in rough labels
                if label_rough in labels_csv.keys():
                    # get proper label
                    label = labels_csv[label_rough]
                    # get index of label in colnames
                    index = colnames.index(label)
                    # put a 1 in same index of row
                    row[index] = 1
            # write row if there is at least one "complete"
            if 1 in row:
                write.writerow(row)


file_name = "ec-test-data-2020-10-21.json"

appCompleteDataToCSV(file_name)
