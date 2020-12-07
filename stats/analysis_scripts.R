data<-read.csv('/Users/kevinkuehn/Documents/EMAR/emotional_clarity/stats/responses_from_json.csv')

### DERS-C Analysis 

data$pre.confused<-c(scale(data$pre.I.am.confused.about.how.I.feel.2E))
data$pre.alexithymia<-c(scale(data$pre.I.have.no.idea.how.I.am.feeling.2E))

data$pre.DERSC<-data$pre.confused+data$pre.alexithymia

data$pre.DERSC_r <- -1 * data$pre.DERSC

data$post.confused<-c(scale(data$post.I.am.confused.about.how.I.feel.2E))
data$post.alexithymia<-c(scale(data$post.I.have.no.idea.how.I.am.feeling.2E))

data$post.DERSC<-data$post.confused+data$post.alexithymia

data$post.DERSC_r <- -1 * data$post.DERSC

data$DERS.change<-data$post.DERSC - data$pre.DERSC

aov.1 <- aov(DERS.change ~ Error(as.factor(user)), data = data)
summary(aov.1)

### Certainty

### Inter-item consistency between certainty and S-DERS

### Descriptive Statistics

### Which responses more frequently answered 

## which emotions / which questions are more frequently answered "yes"
## possibly compare the elicitation prompt input to which app questions they selected
## congruent emotions -- co-occurring. somebody is feeling 2 things at once that seem to be related
## conflicting emotions -- e.g. one positive and one negative
