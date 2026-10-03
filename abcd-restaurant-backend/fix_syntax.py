import os

path = "app/services/cloudinary_service.py"
with open(path, "r") as f:
    content = f.read()

# Fix the broken docstrings
content = content.replace('"\\""', '"""')

with open(path, "w") as f:
    f.write(content)

print("Fixed syntax error in cloudinary_service.py!")
