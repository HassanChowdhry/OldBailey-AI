import json
import xmltodict
import os 

def xmltojson(dir):
    folder = sorted(os.listdir(dir))
    new_dir = "JSONsessionsPapers"
    os.makedirs(new_dir, exist_ok=True)

    # not include dsstore
    for file in folder[1:]:
        with open("data.txt", "a") as f:
            f.write(file + " to ")
        
        with open(f"{dir}/{file}") as xml_file:
            data_dict = xmltodict.parse(xml_file.read())
        
        json_data = json.dumps(data_dict)
        
        with open(f"./{new_dir}/{file}.json", "w") as json_file:
            json_file.write(json_data)
            
        with open("data.txt", "a") as f:
            f.write(file + ".json" + "\n")

dir = "./4775434/OBO_XML_7-2/sessionsPapers"
xmltojson(dir)