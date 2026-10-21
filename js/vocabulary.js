const v=s=>s.split(',').map(x=>{x=x.trim();const i=x.lastIndexOf(' ');return[x.slice(0,i),x.slice(i+1)]});
const VOCAB={
 animals:v('Cat 🐱,Dog 🐶,Cow 🐮,Fish 🐟,Bird 🐦,Horse 🐴,Lion 🦁,Duck 🦆'),
 fruits:v('Apple 🍎,Banana 🍌,Grapes 🍇,Orange 🍊,Carrot 🥕,Tomato 🍅,Potato 🥔,Corn 🌽'),
 colors:v('Red 🔴,Blue 🔵,Green 🟢,Yellow 🟡,Purple 🟣,Square 🟦,Star ⭐,Heart ❤️'),
 numbers:v('One 1️⃣,Two 2️⃣,Three 3️⃣,Four 4️⃣,Five 5️⃣,Six 6️⃣,Seven 7️⃣,Eight 8️⃣'),
 family:v('Mom 👩,Dad 👨,Baby 👶,Grandma 👵,Grandpa 👴,Boy 👦,Girl 👧'),
 body:v('Eye 👁️,Ear 👂,Nose 👃,Mouth 👄,Hand ✋,Foot 🦶,Leg 🦵'),
 food:v('Milk 🥛,Water 💧,Bread 🍞,Egg 🥚,Cake 🍰,Pizza 🍕,Rice 🍚,Juice 🧃'),
 clothes:v('Hat 🎩,Shirt 👕,Shoes 👟,Socks 🧦,Dress 👗,Coat 🧥,Glasses 👓'),
 school:v('Book 📖,Pencil ✏️,Bag 🎒,Ruler 📏,Scissors ✂️,Clock ⏰,Teacher 🧑‍🏫'),
 actions:v('Run 🏃,Eat 🍽️,Sleep 😴,Read 📚,Jump 🤸,Swim 🏊,Sing 🎤,Draw 🖍️'),
 places:v('House 🏠,School 🏫,Park 🌳,Car 🚗,Bus 🚌,Train 🚆,Plane ✈️,Boat ⛵')};
const CATNAMES={animals:'🐱 Animals',fruits:'🍎 Fruits & Veg',colors:'🎨 Colors & Shapes',numbers:'🔢 Numbers',family:'👪 Family',body:'🖐️ Body',food:'🥛 Food & Drink',clothes:'👕 Clothes',school:'🎒 School',actions:'🏃 Actions',places:'🚌 Places'};
const ALPHA=v('Apple 🍎,Ball ⚽,Cat 🐱,Dog 🐶,Egg 🥚,Fish 🐟,Grapes 🍇,Hat 🎩,Ice-cream 🍦,Juice 🧃,Kite 🪁,Lion 🦁,Moon 🌙,Nest 🪺,Orange 🍊,Pig 🐷,Queen 👑,Rabbit 🐰,Sun ☀️,Tree 🌳,Umbrella ☂️,Van 🚐,Water 💧,Xylophone 🎹,Yo-yo 🪀,Zebra 🦓');
const SENT=[['I am happy','This is a cat','I like apples'],['My name is Sam','I want water','The sun is yellow'],['I can see a big dog','My mom is in the kitchen','We go to school by bus']];
const SPK=[['Hello','Apple','Thank you','Cat','Water'],['I like apples','My name is Sam','Good morning','I want water'],['How are you today','Can you help me please','I am sorry teacher','My family is big']];
const DLG=[
 {t:'👋 Greeting',l:[{s:'Hello! How are you?',o:['I am fine, thank you.','I am a cat.'],r:0},{s:'Nice to meet you!',o:['Goodbye, apple.','Nice to meet you too!'],r:1}]},
 {t:'🙂 My name',l:[{s:'What is your name?',o:['It is red.','My name is Sam.'],r:1},{s:'How old are you?',o:['I am six.','I am blue.'],r:0}]},
 {t:'👪 Family',l:[{s:'Who is this?',o:['This is my mom.','This is a banana.'],r:0},{s:'She looks nice!',o:['Yes, I love my family.','Yes, it is a bus.'],r:0}]},
 {t:'🍎 Food',l:[{s:'What do you want?',o:['I want water, please.','I want a hat.'],r:0},{s:'Here you go!',o:['I am a book.','Thank you!'],r:1}]},
 {t:'🏫 Teacher & help',l:[{s:'Good morning, class!',o:['Good morning, teacher!','Good night, dog.'],r:0},{s:'Do you need help?',o:['The sun is big.','Yes, help me please.'],r:1},{s:'Here you are.',o:['Thank you, teacher!','Sorry, I am a fish.'],r:0}]}];
