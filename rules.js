class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                /*if (choice.Target !== "NamazuA" || !this.engine.hasItem("Namazu")){
                    this.engine.addChoice(choice.Text, choice);
                }*/
                if (choice.Target === "Namazu" && !this.engine.hasItem("Fish")) {
                    //this.engine.addChoice(choice.Text, choice);
                    continue; 
                }
                else if(choice.Target === "Fish" && this.engine.hasItem("Fish")){
                    continue; 
                    //this.engine.addChoice(choice.Text, choice);
                }
                else if(choice.Target === "NamazuA" && this.engine.hasItem("Namazu")){
                    continue; 
                }
                else if(choice.Target === "Magnai" && !this.engine.hasItem("Namazu")){
                    continue; 
                }
                else if(choice.Target === "MagnaiA" && this.engine.hasItem("Magnai"))
                {
                    continue; 
                }
                else if(choice.Target === "Battle1" && !this.engine.hasItem("Magnai")){
                    continue; 
                }
                /*else if(choice.Target !== "Fish" || !this.engine.hasItem("Fish")){
                    this.engine.addChoice(choice.Text, choice);
                }*/
                this.engine.addChoice(choice.Text, choice);
                //else if(choice.Target)
                 // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            if(choice.Target === "Fish"){
                //this.engine.show("&gt; "+choice.Text);
                this.engine.updateItem("Fish"); 
                this.engine.show("With expert skill, you reel in a massive fish!"); 
                //this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, "Lake");
            }
            else if(choice.Target === "Namazu" && this.engine.hasItem("Fish")){
                this.engine.updateItem("Namazu"); 
                this.engine.show("Yes, yes, this is a fair trade. I will accompany you, for I feel I may encounter riches with you."); 
                this.engine.gotoScene(Location, "Dhoro Iloh");
            }
            else if(choice.Target === "Magnai" && this.engine.hasItem("Namazu")){
                this.engine.updateItem("Magnai"); 
                this.engine.show("Over the protests of your Namazu friend, the warrior laughs. \"I needed a good laugh. Very well, I shall join you\"\tNow a party of three, you head out."); 
                this.engine.gotoScene(Location, "Dawn Throne Base"); 
            }
            else{
                //this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, choice.Target);
            }            
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');