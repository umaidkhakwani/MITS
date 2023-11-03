from flask import Flask, request, jsonify
import pandas as pd
import tensorflow as tf
import numpy as np
import os
app = Flask(__name__)

@app.route('/train', methods=['POST', 'GET'])
def Train():
    import pandas as pd
    import tensorflow as tf
    import numpy as np
    data = request.get_json()  # Get JSON data from the request
    sku = data['sku']
    data_array = data['data']
    print(type(data_array))
    final_df = pd.DataFrame(data_array)
    
    
    if not os.path.exists(sku+".h5"):
        
    
        # Convert the data array to a Pandas DataFrame
        

        quantity = []
        for i in final_df['quantity']:
            quantity.append(i)

        input_sequences=[]
        for i in quantity:
            for i in range(len(quantity)):
                if i ==0:
                  continue
                else:
                  n_gram_sequence = quantity[:i+1]
                  input_sequences.append(n_gram_sequence)

        def pad_seqs(input_sequences, maxlen):
            """
            Pads tokenized sequences to the same length

            Args:
                input_sequences (list of int): tokenized sequences to pad
                maxlen (int): maximum length of the token sequences

            Returns:
                padded_sequences (array of int): tokenized sequences padded to the same length
            """
            ### START CODE HERE
            padded_sequences = []
            for sequence in input_sequences:
                if len(sequence) >= maxlen:
                    padded_sequence = sequence[:maxlen]
                    padded_sequences.append(padded_sequence)
                else:
                    padded_sequence=[]
                    padding_length = maxlen - len(sequence)
                    for i in range(padding_length):
                       padded_sequence.append(0)
                    for i in sequence:
                       padded_sequence.append(i)
                    padded_sequences.append(padded_sequence)
            return np.array(padded_sequences)
        
        pads = pad_seqs(input_sequences,668)
        def features_and_labels(input_sequences):
            """
            Generates features and labels from n-grams

            Args:
                input_sequences (list of int): sequences to split features and labels from
                total_words (int): vocabulary size

            Returns:
                features, one_hot_labels (array of int, array of int): arrays of features and one-hot encoded labels
            """
            ### START CODE HERE
            features = []
            labels = []
            one_hot_labels = []
            for i in input_sequences:
                stop=len(i)-1
                features.append(np.array(i[:stop]).reshape(1,-1))
                labels.append(np.array(i[-1]).reshape(1,-1))





            ### END CODE HERE

            return np.array(features), np.array(labels)
        features,labels = features_and_labels(pads)
        import tensorflow as tf
        tf.keras.backend.clear_session()

        # Build the model
        model = tf.keras.models.Sequential([
        tf.keras.layers.Conv1D(filters=64, kernel_size=3,
                            strides=1, padding="causal",
                            activation="relu",
                            input_shape=[1,667]),
        tf.keras.layers.LSTM(64, return_sequences=True),
        tf.keras.layers.LSTM(64),
        tf.keras.layers.Dense(1),
        tf.keras.layers.Lambda(lambda x: x * 400)
        ])
        lr_schedule = tf.keras.callbacks.LearningRateScheduler(
            lambda epoch: 1e-8 * 10**(epoch / 20))

        # Initialize the optimizer
        optimizer = tf.keras.optimizers.SGD(momentum=0.9)

        # Set the training parameters
        model.compile(loss=tf.keras.losses.Huber(), optimizer=optimizer)
        # Initialize the EarlyStopping callback
        import tensorflow as tf

        import tensorflow as tf

        class StopTrainingOnLossIncrease(tf.keras.callbacks.Callback):
            def __init__(self, tolerance=0.001):
                super(StopTrainingOnLossIncrease, self).__init__()
                self.best_loss = float('inf')
                self.tolerance = tolerance

            def on_epoch_end(self, epoch, logs=None):
                current_loss = logs.get('loss')
                if current_loss > self.best_loss:
                    if current_loss - self.best_loss > self.tolerance:
                        print(f"Training stopped: Loss increased from {self.best_loss:.6f} to {current_loss:.6f}")
                        self.model.stop_training = True
                    else:
                        print(f"Loss increased slightly, but within tolerance: {self.best_loss:.6f} to {current_loss:.6f}")
                else:
                    self.best_loss = current_loss
        # Create an instance of the custom callback
        stop_training_callback = StopTrainingOnLossIncrease(tolerance=0.04)

        # Initialize your model, optimizer, and compile the model as usual

        # Train the model with the custom callback


        # Train the model with early stopping
        history = model.fit(features, labels, epochs=100, callbacks=[lr_schedule,stop_training_callback])

        # Save the model
        model.save(sku + '.h5')

        return('training Complete')
    else:

        model = tf.keras.models.load_model(sku+".h5")
        quantity = []
        for i in final_df['quantity']:
            quantity.append(i)

        input_sequences=[]
        for i in quantity:
            for i in range(len(quantity)):
                if i ==0:
                    continue
                else:
                    n_gram_sequence = quantity[:i+1]
                    input_sequences.append(n_gram_sequence)

        def pad_seqs(input_sequences, maxlen):
            """
            Pads tokenized sequences to the same length

            Args:
                input_sequences (list of int): tokenized sequences to pad
                maxlen (int): maximum length of the token sequences

            Returns:
                padded_sequences (array of int): tokenized sequences padded to the same length
            """
            ### START CODE HERE
            padded_sequences = []
            for sequence in input_sequences:
                if len(sequence) >= maxlen:
                    padded_sequence = sequence[:maxlen]
                    padded_sequences.append(padded_sequence)
                else:
                    padded_sequence=[]
                    padding_length = maxlen - len(sequence)
                    for i in range(padding_length):
                        padded_sequence.append(0)
                    for i in sequence:
                        padded_sequence.append(i)
                    padded_sequences.append(padded_sequence)
            return np.array(padded_sequences)
       
        pads = pad_seqs(input_sequences,668)
        def features_and_labels(input_sequences):
            """
            Generates features and labels from n-grams

            Args:
                input_sequences (list of int): sequences to split features and labels from
                total_words (int): vocabulary size

            Returns:
                features, one_hot_labels (array of int, array of int): arrays of features and one-hot encoded labels
            """
            ### START CODE HERE
            features = []
            labels = []
            one_hot_labels = []
            for i in input_sequences:
                stop=len(i)-1
                features.append(np.array(i[:stop]).reshape(1,-1))
                labels.append(np.array(i[-1]).reshape(1,-1))





            ### END CODE HERE

            return np.array(features), np.array(labels)
        features,labels = features_and_labels(pads)
        feature= features[-1]
        pre=[]
        for i in range (30):
            print(tf.expand_dims(feature,axis=0).shape)
            pred = model.predict(tf.expand_dims(feature,axis=0))[0][0]

            feature=np.expand_dims(np.append(feature[0][1:],int(np.round((pred)))),axis=0)

            pre.append(int(pred))
        print(final_df)
        print(pre)
        sum=0
        for i in pre:
            print(np.round(i))
            if i <0:
                sum += np.round(-1*i)
            else:
                sum += np.round(i)
        sum1=0
        for i in pre:
            print(np.round(i))
            sum1 += np.round(i)
        if sum1<0:
            sum1=0
        print(sum-sum1/2)
        d= {'max':int((sum-sum1)/2),
        'min':int(sum1)}
        
        return jsonify({'predictions': [d]})



if __name__ == '__main__':
    app.run(port=4000,debug=True) 